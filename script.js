const STORAGE_KEY = 'baseballMonsterHunterSave';

const PAGE_CONFIG = {
  // 경기 화면을 만들면 아래 값을 'game.html' 또는 실제 경기 화면 이름으로 바꾸면 됩니다.
  gamePage: null,
  settingsPage: null,
};

const POSITION_NAMES = {
  catcher: '포수',
  first: '1루수',
  second: '2루수',
  third: '3루수',
  shortstop: '유격수',
  left: '좌익수',
  center: '중견수',
  right: '우익수',
};

const DEFAULT_GAME_STATE = {
  gold: 0,
  currentStage: 1,
  currentMode: 'attack',
  representativePlayer: {
    position: 'catcher',
    name: '',
    level: 1,
    attack: 10,
  },
  tutorialFlags: {
    representativeBatterSet: false,
  },
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

let toastTimer = null;
let gameState = loadGameState();

function cloneDefaultState() {
  return JSON.parse(JSON.stringify(DEFAULT_GAME_STATE));
}

function loadGameState() {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);

    if (!savedData) {
      return cloneDefaultState();
    }

    const parsedData = JSON.parse(savedData);
    const defaultState = cloneDefaultState();

    return {
      ...defaultState,
      ...parsedData,
      representativePlayer: {
        ...defaultState.representativePlayer,
        ...(parsedData.representativePlayer ?? {}),
      },
      tutorialFlags: {
        ...defaultState.tutorialFlags,
        ...(parsedData.tutorialFlags ?? {}),
      },
    };
  } catch (error) {
    console.warn('저장 데이터를 불러오지 못했습니다.', error);
    return cloneDefaultState();
  }
}

function saveGameState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
  } catch (error) {
    console.warn('저장 데이터를 저장하지 못했습니다.', error);
  }
}

function normalizeNumber(value, fallback = 0) {
  const parsedValue = Number(value);
  return Number.isFinite(parsedValue) ? parsedValue : fallback;
}

function formatGold(value) {
  return `${Math.max(0, Math.floor(normalizeNumber(value))).toLocaleString('ko-KR')}G`;
}

function getModeName(mode) {
  return mode === 'defense' ? '수비' : '공격';
}

function showToast(message) {
  const toast = $('#toast');

  if (!toast) {
    return;
  }

  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('is-visible');

  toastTimer = window.setTimeout(() => {
    toast.classList.remove('is-visible');
  }, 1400);
}

function showScreen(screenName) {
  const startScreen = $('#startScreen');
  const representativeScreen = $('#representativeScreen');

  startScreen?.classList.toggle('is-hidden', screenName !== 'start');
  representativeScreen?.classList.toggle('is-hidden', screenName !== 'representative');

  if (screenName === 'representative') {
    renderRepresentativeScreen();
    representativeScreen?.querySelector('.representative-scroll-area')?.scrollTo({ top: 0 });
  }
}

function moveToPage(pageUrl, fallbackMessage) {
  if (pageUrl) {
    window.location.href = pageUrl;
    return;
  }

  showToast(fallbackMessage);
}

function handleGameStart() {
  // 현재 단계에서는 게임 시작 버튼을 누르면 대표 타자 설정 화면으로 이동합니다.
  // 추후 경기 화면이 만들어지면 아래 조건으로 첫 접속/재접속 분기가 가능합니다.
  // if (gameState.tutorialFlags.representativeBatterSet) moveToPage(PAGE_CONFIG.gamePage, '경기 화면으로 이동합니다.');
  // else showScreen('representative');
  showScreen('representative');
}

function renderRepresentativeScreen() {
  const player = gameState.representativePlayer;
  const playerName = player.name.trim();

  const statusGold = $('#statusGold');
  const statusStage = $('#statusStage');
  const statusMode = $('#statusMode');
  const profileName = $('#profileName');
  const playerLevel = $('#playerLevel');
  const playerAttack = $('#playerAttack');
  const playerNameInput = $('#playerNameInput');

  if (statusGold) statusGold.textContent = formatGold(gameState.gold);
  if (statusStage) statusStage.textContent = `Stage ${gameState.currentStage}`;
  if (statusMode) statusMode.textContent = getModeName(gameState.currentMode);
  if (profileName) profileName.textContent = playerName || '이름 입력';
  if (playerLevel) playerLevel.textContent = `Lv. ${player.level}`;
  if (playerAttack) playerAttack.textContent = String(player.attack);

  if (playerNameInput && document.activeElement !== playerNameInput) {
    playerNameInput.value = player.name;
  }

  $$('.position-button').forEach((button) => {
    const isSelected = button.dataset.position === player.position;
    button.classList.toggle('is-selected', isSelected);
    button.setAttribute('aria-checked', String(isSelected));
  });
}

function setRepresentativePosition(position) {
  if (!POSITION_NAMES[position]) {
    return;
  }

  gameState.representativePlayer.position = position;
  saveGameState();
  renderRepresentativeScreen();
}

function updateRepresentativeNameFromInput() {
  const playerNameInput = $('#playerNameInput');

  if (!playerNameInput) {
    return;
  }

  gameState.representativePlayer.name = playerNameInput.value.trim();
  saveGameState();
  renderRepresentativeScreen();
}

function saveRepresentativeName() {
  const playerNameInput = $('#playerNameInput');

  if (!playerNameInput) {
    return;
  }

  const newName = playerNameInput.value.trim();

  if (!newName) {
    showToast('대표 타자 이름을 입력해 주세요.');
    playerNameInput.focus();
    return;
  }

  gameState.representativePlayer.name = newName;
  saveGameState();
  renderRepresentativeScreen();
  showToast(`${newName} 이름으로 저장했습니다.`);
}

function confirmRepresentativeBatter() {
  const playerNameInput = $('#playerNameInput');
  const name = playerNameInput?.value.trim() ?? '';

  if (!name) {
    showToast('시작하기 전에 대표 타자 이름을 입력해 주세요.');
    playerNameInput?.focus();
    return;
  }

  gameState.representativePlayer.name = name;
  gameState.currentStage = 1;
  gameState.currentMode = 'attack';
  gameState.tutorialFlags.representativeBatterSet = true;
  saveGameState();

  moveToPage(PAGE_CONFIG.gamePage, '대표 타자 설정 완료! 경기 화면은 다음 단계에서 연결됩니다.');
}

function initStartScreen() {
  $('#startButton')?.addEventListener('click', handleGameStart);

  $('#settingsButton')?.addEventListener('click', () => {
    moveToPage(PAGE_CONFIG.settingsPage, '설정 화면은 다음 단계에서 연결할 예정입니다.');
  });
}

function initRepresentativeScreen() {
  gameState.currentStage = 1;
  gameState.currentMode = 'attack';
  saveGameState();

  $$('.position-button').forEach((button) => {
    button.addEventListener('click', () => {
      setRepresentativePosition(button.dataset.position);
    });
  });

  $('#playerNameInput')?.addEventListener('input', updateRepresentativeNameFromInput);

  $('#playerNameInput')?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      saveRepresentativeName();
    }
  });

  $('#nameChangeButton')?.addEventListener('click', saveRepresentativeName);
  $('#representativeStartButton')?.addEventListener('click', confirmRepresentativeBatter);

  $$('.bottom-nav-button').forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.dataset.target;

      if (target === 'players') {
        showToast('현재 선수 설정 화면입니다.');
        return;
      }

      const targetPageMap = {
        game: PAGE_CONFIG.gamePage,
        synergy: null,
        log: null,
      };

      const fallbackMap = {
        game: '경기 화면은 다음 단계에서 연결할 예정입니다.',
        synergy: '시너지 화면은 다음 단계에서 연결할 예정입니다.',
        log: '로그 화면은 다음 단계에서 연결할 예정입니다.',
      };

      moveToPage(targetPageMap[target], fallbackMap[target] ?? '해당 화면은 다음 단계에서 연결할 예정입니다.');
    });
  });

  renderRepresentativeScreen();
}

function initGame() {
  initStartScreen();
  initRepresentativeScreen();
  showScreen('start');
}

window.BaseballMonsterHunter = {
  getState() {
    return JSON.parse(JSON.stringify(gameState));
  },
  setGold(value) {
    gameState.gold = Math.max(0, Math.floor(normalizeNumber(value)));
    saveGameState();
    renderRepresentativeScreen();
  },
  addGold(amount) {
    gameState.gold = Math.max(0, Math.floor(gameState.gold + normalizeNumber(amount)));
    saveGameState();
    renderRepresentativeScreen();
  },
  resetSave() {
    gameState = cloneDefaultState();
    saveGameState();
    renderRepresentativeScreen();
  },
};

initGame();
