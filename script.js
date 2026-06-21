const PAGE_CONFIG = {
  startPage: 'index.html',
  representativePage: 'representative.html',
  settingsPage: null,
  gamePage: null,
  playersPage: 'representative.html',
  synergyPage: null,
  logPage: null,
};

const POSITION_DATA = {
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
};

const STORAGE_KEY = 'baseballMonsterHunterSave';

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

let toastTimer = null;
let gameState = loadGameState();

function cloneDefaultState() {
  return JSON.parse(JSON.stringify(DEFAULT_GAME_STATE));
}

function normalizeNumber(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function formatGold(value) {
  return `${Math.max(0, Math.floor(normalizeNumber(value))).toLocaleString('ko-KR')}G`;
}

function getModeText(mode) {
  return mode === 'defense' ? '수비' : '공격';
}

function loadGameState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return cloneDefaultState();

    const parsed = JSON.parse(saved);
    return {
      ...cloneDefaultState(),
      ...parsed,
      representativePlayer: {
        ...cloneDefaultState().representativePlayer,
        ...(parsed.representativePlayer ?? {}),
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

function showToast(message) {
  const toast = $('#toast');
  if (!toast) return;

  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('is-visible');

  toastTimer = window.setTimeout(() => {
    toast.classList.remove('is-visible');
  }, 1400);
}

function moveToPage(pageUrl, fallbackMessage) {
  if (pageUrl) {
    window.location.href = pageUrl;
    return;
  }

  showToast(fallbackMessage);
}

function initStartPage() {
  const startButton = $('#startButton');
  const settingsButton = $('#settingsButton');

  startButton?.addEventListener('click', () => {
    moveToPage(PAGE_CONFIG.representativePage, '대표 타자 설정 화면으로 이동합니다.');
  });

  settingsButton?.addEventListener('click', () => {
    moveToPage(PAGE_CONFIG.settingsPage, '설정 화면은 다음 단계에서 연결할 예정입니다.');
  });
}

function renderRepresentativePage() {
  const goldValue = $('#goldValue');
  const stageValue = $('#stageValue');
  const modeValue = $('#modeValue');
  const selectedPositionName = $('#selectedPositionName');
  const levelValue = $('#levelValue');
  const attackValue = $('#attackValue');
  const playerName = $('#playerName');

  if (goldValue) goldValue.textContent = formatGold(gameState.gold);
  if (stageValue) stageValue.textContent = `Stage ${gameState.currentStage}`;
  if (modeValue) modeValue.textContent = getModeText(gameState.currentMode);

  const player = gameState.representativePlayer;
  const positionName = POSITION_DATA[player.position] ?? '포수';

  if (selectedPositionName) selectedPositionName.textContent = positionName;
  if (levelValue) levelValue.textContent = `Lv. ${player.level}`;
  if (attackValue) attackValue.textContent = String(player.attack);
  if (playerName && document.activeElement !== playerName) {
    playerName.value = player.name;
  }

  $$('.position-button').forEach((button) => {
    const isSelected = button.dataset.position === player.position;
    button.classList.toggle('is-selected', isSelected);
    button.setAttribute('aria-checked', String(isSelected));
  });
}

function setRepresentativePosition(position) {
  if (!POSITION_DATA[position]) return;

  gameState.representativePlayer.position = position;
  saveGameState();
  renderRepresentativePage();
  showToast(`${POSITION_DATA[position]} 포지션을 선택했습니다.`);
}

function updateRepresentativeName() {
  const playerName = $('#playerName');
  if (!playerName) return;

  const trimmedName = playerName.value.trim();

  if (!trimmedName) {
    showToast('대표 타자 이름을 입력해 주세요.');
    playerName.focus();
    return;
  }

  gameState.representativePlayer.name = trimmedName;
  saveGameState();
  renderRepresentativePage();
  showToast(`${trimmedName} 이름으로 저장했습니다.`);
}

function confirmRepresentativeBatter() {
  const playerName = $('#playerName');
  const name = playerName?.value.trim() ?? '';

  if (!name) {
    showToast('시작하기 전에 대표 타자 이름을 입력해 주세요.');
    playerName?.focus();
    return;
  }

  gameState.representativePlayer.name = name;
  gameState.currentMode = 'attack';
  gameState.currentStage = 1;
  saveGameState();

  showToast('대표 타자 설정 완료! 경기 화면은 다음 단계에서 연결됩니다.');
}

function initRepresentativePage() {
  gameState.currentMode = 'attack';
  gameState.currentStage = gameState.currentStage || 1;
  saveGameState();

  $$('.position-button').forEach((button) => {
    button.addEventListener('click', () => {
      setRepresentativePosition(button.dataset.position);
    });
  });

  $('#changeNameButton')?.addEventListener('click', updateRepresentativeName);

  $('#playerName')?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      updateRepresentativeName();
    }
  });

  $('#confirmBatterButton')?.addEventListener('click', confirmRepresentativeBatter);

  $$('.nav-button').forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.dataset.target;

      if (target === 'players') {
        showToast('현재 선수 설정 화면입니다.');
        return;
      }

      const pageUrl = PAGE_CONFIG[`${target}Page`];
      const targetName = button.querySelector('img')?.alt || '해당';
      moveToPage(pageUrl, `${targetName} 화면은 다음 단계에서 연결할 예정입니다.`);
    });
  });

  renderRepresentativePage();
}

function initPage() {
  const page = document.body.dataset.page;

  if (page === 'start') {
    initStartPage();
    return;
  }

  if (page === 'representative') {
    initRepresentativePage();
  }
}

window.BaseballMonsterHunter = {
  getState: () => JSON.parse(JSON.stringify(gameState)),
  setGold(value) {
    gameState.gold = Math.max(0, Math.floor(normalizeNumber(value)));
    saveGameState();
    renderRepresentativePage();
  },
  addGold(amount) {
    gameState.gold = Math.max(0, gameState.gold + Math.floor(normalizeNumber(amount)));
    saveGameState();
    renderRepresentativePage();
  },
  resetSave() {
    gameState = cloneDefaultState();
    saveGameState();
    renderRepresentativePage();
  },
};

initPage();
