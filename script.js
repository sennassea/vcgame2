const STORAGE_KEY = 'baseballMonsterHunterSave';

const PAGE_CONFIG = {
  // 다음 화면을 별도 파일로 만들면 null 대신 실제 파일명을 넣으면 됩니다.
  // 예: stage2Page: 'stage2.html', settingsPage: 'settings.html'
  stage2Page: null,
  settingsPage: null,
  synergyPage: null,
  logPage: null,
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
    position: '',
    name: '',
    pitcherName: '',
    level: 1,
    attack: 10,
    goldGain: 5,
  },
  tutorialFlags: {
    representativeBatterSet: false,
    representativePitcherSet: false,
    stage1Cleared: false,
    firstDefenseHitDone: false,
    firstDefensePitchCount: 0,
    defenseSupportGranted: false,
    playerTabGuidanceActive: false,
  },
};

const STAGE_CONFIGS = {
  1: {
    monsterName: 'A 몬스터',
    monsterLevel: 1,
    maxHp: 50,
    timeLimit: 30,
    attackDamage: 10,
    criticalChance: 0,
    attackCycleMs: 2000,
    frame2DelayMs: 520,
    frame3DelayMs: 1040,
    resetDelayMs: 1450,
  },
  2: {
    monsterName: 'A 몬스터',
    monsterLevel: 2,
    maxHp: 160,
    timeLimit: 30,
    attackDamage: 10,
    criticalChance: 0,
    attackCycleMs: 2000,
    frame2DelayMs: 520,
    frame3DelayMs: 1040,
    resetDelayMs: 1450,
  },
};

// 하위호환성을 위한 참조
const ATTACK_TUTORIAL = STAGE_CONFIGS[1];

const ATTACK_FRAMES = [
  'assets/attack-frame-1.png',
  'assets/attack-frame-2.png',
  'assets/attack-frame-3.png',
];

const DEFENSE_FRAMES = [
  'assets/defense-frame-1.png',
  'assets/defense-frame-2.png',
  'assets/defense-frame-3.png',
];

const DEFENSE_CONFIG = {
  pitchCycleMs: 2000,
  frame2DelayMs: 620,
  frame3DelayMs: 1180,
  resultDelayMs: 1320,
  resetDelayMs: 1850,
  monsterHitChance: 0.3,
};

const MONSTER_IMAGES = {
  normal: 'assets/monster-normal.png',
  proud: 'assets/monster-proud.png',
  hit: 'assets/monster-hit.png',
  crying: 'assets/monster-crying.png',
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

let toastTimer = null;
let defenseRuleTooltipTimer = null;
let attackTimerId = null;
let attackLoopId = null;
let attackTimeoutIds = [];
let defenseLoopId = null;
let defenseTimeoutIds = [];
let defenseSupportModalTimerId = null;
let gameState = loadGameState();
let attackState = createAttackState();
let defenseState = { isRunning: false };

function cloneDefaultState() {
  return JSON.parse(JSON.stringify(DEFAULT_GAME_STATE));
}

function createAttackState() {
  const config = getAttackConfigForStage(gameState.currentStage);
  return {
    hp: config.maxHp,
    timeLeft: config.timeLimit,
    isRunning: false,
    isCleared: false,
  };
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

function getMonsterStageScale(stage) {
  const normalizedStage = Math.max(1, Math.floor(normalizeNumber(stage, 1)));
  return Math.min(1 + (normalizedStage - 1) * 0.06, 1.45);
}

function getAttackConfigForStage(stage) {
  const normalizedStage = Math.max(1, Math.floor(normalizeNumber(stage, 1)));
  return STAGE_CONFIGS[normalizedStage] ?? STAGE_CONFIGS[1];
}

function getDefenseRewards() {
  const stageMultiplier = 1 + (Math.max(1, gameState.currentStage) - 1) * 0.15;
  const batterySynergyMultiplier = 1;

  return {
    hit: Math.round(10 * stageMultiplier * batterySynergyMultiplier),
    catch: Math.round(20 * stageMultiplier * batterySynergyMultiplier),
  };
}

function getPitcherHitChance() {
  return Math.min(0.5 + (gameState.representativePlayer.level - 1) * 0.005, 0.85);
}

function getFielderCatchChance() {
  const infieldSynergyStep = 0;
  return Math.min(0.1 + infieldSynergyStep * 0.01, 0.6);
}

function getSelectedPositionName() {
  return POSITION_NAMES[gameState.representativePlayer.position] ?? '';
}

function getDraftName() {
  const input = $('#playerNameInput');
  const storedName =
    gameState.currentMode === 'defense'
      ? gameState.representativePlayer.pitcherName
      : gameState.representativePlayer.name;
  return (input?.value ?? storedName).trim();
}

function getRepresentativeStatLabel() {
  return gameState.currentMode === 'defense' ? '골드 획득량' : '공격력';
}

function getRepresentativeStatValue() {
  const player = gameState.representativePlayer;
  return gameState.currentMode === 'defense' ? player.goldGain : player.attack;
}

function isTutorialInProgress() {
  return !gameState.tutorialFlags.defenseSupportGranted ||
    gameState.tutorialFlags.playerTabGuidanceActive;
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
  }, 1500);
}

function hideDefenseRuleTooltip() {
  const tooltip = $('#defenseRuleTooltip');
  if (!tooltip) return;

  window.clearTimeout(defenseRuleTooltipTimer);
  tooltip.classList.add('is-hidden');
  $$('.defense-rule-item').forEach((button) => {
    button.classList.remove('is-selected');
  });
}

function showDefenseRuleTooltip(button) {
  const tooltip = $('#defenseRuleTooltip');
  if (!tooltip) return;

  const descriptions = {
    hit: '투수가 몬스터를 맞혔습니다.',
    miss: '투수가 던진 공이 몬스터를 빗나갔습니다.',
    'monster-hit': '투수의 공을 몬스터가 받아쳤습니다.',
    catch: '몬스터가 친 공을 야수가 잡았습니다.',
  };

  const description = descriptions[button.dataset.rule];
  if (!description) return;

  window.clearTimeout(defenseRuleTooltipTimer);
  $$('.defense-rule-item').forEach((ruleButton) => {
    ruleButton.classList.toggle('is-selected', ruleButton === button);
  });
  tooltip.textContent = description;
  tooltip.classList.remove('is-hidden');

  defenseRuleTooltipTimer = window.setTimeout(hideDefenseRuleTooltip, 3500);
}

function moveToPage(pageUrl, fallbackMessage) {
  if (pageUrl) {
    window.location.href = pageUrl;
    return;
  }

  showToast(fallbackMessage);
}

function clearAttackTimeouts() {
  attackTimeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
  attackTimeoutIds = [];
}

function stopAttackTutorial() {
  attackState.isRunning = false;

  if (attackTimerId) {
    window.clearInterval(attackTimerId);
    attackTimerId = null;
  }

  if (attackLoopId) {
    window.clearInterval(attackLoopId);
    attackLoopId = null;
  }

  clearAttackTimeouts();
}

function clearDefenseTimeouts() {
  defenseTimeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
  defenseTimeoutIds = [];
}

function stopDefenseMode() {
  defenseState.isRunning = false;

  if (defenseLoopId) {
    window.clearInterval(defenseLoopId);
    defenseLoopId = null;
  }

  clearDefenseTimeouts();
}

function hideDefenseSupportModal() {
  $('#defenseSupportModal')?.classList.add('is-hidden');
}

function setDefenseSupportPending(isActive) {
  const attackScreen = $('#attackScreen');
  const inputLock = $('#playerTabInputLock');

  attackScreen?.classList.toggle('is-defense-support-pending', isActive);
  inputLock?.classList.toggle(
    'is-hidden',
    !isActive && !gameState.tutorialFlags.playerTabGuidanceActive
  );
}

function setPlayerTabGuidance(isActive) {
  const attackScreen = $('#attackScreen');
  const inputLock = $('#playerTabInputLock');
  const playerButton = $('#attackScreen .bottom-nav-button[data-target="players"]');

  attackScreen?.classList.toggle('is-player-tab-guided', isActive);
  inputLock?.classList.toggle('is-hidden', !isActive);
  playerButton?.classList.toggle('is-tutorial-target', isActive);

  $$('#attackScreen .bottom-nav-button').forEach((button) => {
    if (button.dataset.target !== 'players') {
      button.setAttribute('aria-disabled', String(isActive));
    }
  });
}

function showDefenseSupportModal() {
  $('#defenseSupportModal')?.classList.remove('is-hidden');
}

function beginPlayerTabGuidance() {
  hideDefenseSupportModal();
  setDefenseSupportPending(false);
  gameState.tutorialFlags.playerTabGuidanceActive = true;
  saveGameState();
  setPlayerTabGuidance(true);
  showToast('화살표가 가리키는 선수 탭을 선택하세요.');
}

function showScreen(screenName) {
  const startScreen = $('#startScreen');
  const representativeScreen = $('#representativeScreen');
  const attackScreen = $('#attackScreen');

  startScreen?.classList.toggle('is-hidden', screenName !== 'start');
  representativeScreen?.classList.toggle('is-hidden', screenName !== 'representative');
  attackScreen?.classList.toggle('is-hidden', screenName !== 'attack');

  if (screenName !== 'attack') {
    stopAttackTutorial();
    stopDefenseMode();
    setDefenseSupportPending(false);
    setPlayerTabGuidance(false);
    hideAllModals();
  }

  if (screenName === 'representative') {
    renderRepresentativeScreen();
    representativeScreen?.querySelector('.representative-scroll-area')?.scrollTo({ top: 0 });
  }

  if (screenName === 'attack') {
    renderAttackScreen();
  }
}

function handleGameStart() {
  showScreen('representative');
}

function renderCommonStatus() {
  const statusItems = [
    ['statusGold', formatGold(gameState.gold)],
    ['statusStage', `Stage ${gameState.currentStage}`],
    ['statusMode', getModeName(gameState.currentMode)],
    ['attackStatusGold', formatGold(gameState.gold)],
    ['attackStatusStage', `Stage ${gameState.currentStage}`],
    ['attackStatusMode', getModeName(gameState.currentMode)],
  ];

  statusItems.forEach(([id, value]) => {
    const element = $(`#${id}`);
    if (element) element.textContent = value;
  });
}

function renderRepresentativeScreen() {
  const player = gameState.representativePlayer;
  const positionName = getSelectedPositionName();
  const positionDisplayName =
    gameState.currentMode === 'defense'
      ? '1선발'
      : positionName || '선택 필요';
    const savedName = gameState.currentMode === 'defense' ? player.pitcherName.trim() : player.name.trim();
    const draftName = getDraftName();
    // For 대표 타자(공격) page, prefer to show the placeholder '이름 입력' rather than previously saved name
    const displayName = draftName || (gameState.currentMode === 'defense' ? savedName : '') || '이름 입력';

  const profileName = $('#profileName');
  const playerRoleLabel = $('#playerRoleLabel');
  const playerLevel = $('#playerLevel');
  const playerStatLabel = $('#playerStatLabel');
  const playerStatValue = $('#playerStatValue');
  const playerNameInput = $('#playerNameInput');
  const summaryPosition = $('#summaryPosition');
  const summaryName = $('#summaryName');
  const positionSelectArea = document.querySelector('.position-select-area');
  const tutorialLine1 = $('#tutorialLine1');
  const tutorialLine2 = $('#tutorialLine2');
  const representativeTitle = $('#representativeTitle');
  const profileImage = document.querySelector('.batter-profile-image');

  renderCommonStatus();

  if (representativeTitle) {
    representativeTitle.textContent =
      gameState.currentMode === 'defense' ? '대표 투수 설정' : '대표 타자 설정';
  }

  if (tutorialLine1) {
    tutorialLine1.textContent =
      gameState.currentMode === 'defense'
        ? '수비 모드에 필요한 대표 투수를 선택해보세요.'
        : '야구 몬스터 헌터에 온 걸 환영해요!';
  }

  if (tutorialLine2) {
    tutorialLine2.textContent =
      gameState.currentMode === 'defense'
        ? '골드 획득량이 높은 투수를 뽑아 수비를 강화하세요.'
        : '몬스터를 잡기 위한 첫 대표 타자를 설정해보세요.';
  }

  if (playerRoleLabel) {
    playerRoleLabel.textContent =
      gameState.currentMode === 'defense' ? '대표 투수' : '대표 타자';
  }

  if (profileImage) {
    profileImage.src =
      gameState.currentMode === 'defense'
        ? 'assets/profile-pitcher.png'
        : 'assets/profile-batter.png';
    profileImage.alt =
      gameState.currentMode === 'defense'
        ? '대표 투수 프로필'
        : '대표 타자 프로필';
  }

  if (profileName) profileName.textContent = displayName;
  if (playerLevel) playerLevel.textContent = `Lv. ${player.level}`;
  if (playerStatLabel) playerStatLabel.textContent = getRepresentativeStatLabel();
  if (playerStatValue) playerStatValue.textContent = String(getRepresentativeStatValue());
    if (summaryPosition) summaryPosition.textContent = positionDisplayName;
    if (summaryName) summaryName.textContent = displayName;

  if (playerNameInput) {
    playerNameInput.placeholder =
      gameState.currentMode === 'defense'
        ? '투수 이름을 입력하세요'
        : '이름을 입력하세요';
    playerNameInput.setAttribute(
      'aria-label',
      gameState.currentMode === 'defense'
        ? '대표 투수 이름 입력'
        : '대표 타자 이름 입력'
    );

    if (gameState.currentMode === 'defense') {
      // Do not auto-fill previous pitcher name in input; show placeholder instead
      playerNameInput.value = '';
    }
  }

  if (positionSelectArea) {
    positionSelectArea.classList.toggle('is-hidden', gameState.currentMode === 'defense');
  }

  // Do not auto-fill previously saved batter name when opening the representative (attack) page.

  $$('.position-button').forEach((button) => {
    const isSelected = button.dataset.position === player.position;
    button.classList.toggle('is-selected', isSelected);
    button.setAttribute('aria-checked', String(isSelected));
  });

  // Toggle compact pitcher layout when in defense mode
  const profileCard = document.querySelector('.batter-profile-card');
  if (profileCard) {
    profileCard.classList.toggle('is-pitcher', gameState.currentMode === 'defense');
  }
}

function updateRepresentativePreview() {
  const positionName = getSelectedPositionName();
  const positionDisplayName = gameState.currentMode === 'defense' ? '1선발' : positionName || '선택 필요';
  const draftName = getDraftName();
  const displayName = draftName || '이름 입력';

  const profileName = $('#profileName');
  const summaryPosition = $('#summaryPosition');
  const summaryName = $('#summaryName');

  if (profileName) profileName.textContent = displayName;
  if (summaryPosition) summaryPosition.textContent = positionDisplayName;
  if (summaryName) summaryName.textContent = displayName;
}

function setRepresentativePosition(position) {
  if (!POSITION_NAMES[position]) {
    return;
  }

  gameState.representativePlayer.position = position;
  saveGameState();
  renderRepresentativeScreen();
}

function completeRepresentativeSetup() {
  const playerNameInput = $('#playerNameInput');
  const name = playerNameInput?.value.trim() ?? '';
  const hasPosition = Boolean(gameState.representativePlayer.position);

  if (gameState.currentMode === 'defense') {
    if (!name) {
      showToast('대표 투수 이름을 입력해 주세요.');
      playerNameInput?.focus();
      return;
    }

    gameState.representativePlayer.pitcherName = name;
    gameState.tutorialFlags.representativePitcherSet = true;
    saveGameState();
    startDefenseMode();
    return;
  }

  if (!hasPosition && !name) {
    showToast('대표 타자의 포지션과 이름을 모두 설정해 주세요.');
    playerNameInput?.focus();
    return;
  }

  if (!hasPosition) {
    showToast('대표 타자의 포지션을 선택해 주세요.');
    return;
  }

  if (!name) {
    showToast('대표 타자 이름을 입력해 주세요.');
    playerNameInput?.focus();
    return;
  }

  gameState.representativePlayer.name = name;
  gameState.currentStage = 1;
  gameState.currentMode = 'attack';
  gameState.tutorialFlags.representativeBatterSet = true;
  saveGameState();
  renderRepresentativeScreen();

  startAttackTutorial();
}

function renderDefenseScreen() {
  const config = getAttackConfigForStage(gameState.currentStage);
  const rewards = getDefenseRewards();
  const attackScreen = $('#attackScreen');
  const battleBatter = $('#battleBatter');
  const battleMonster = $('#battleMonster');
  const monsterNameDisplay = $('#monsterNameDisplay');
  const battleInfoKicker = $('#battleInfoKicker');
  const battleGuideText = $('#battleGuideText');
  const defenseRuleLegend = $('#defenseRuleLegend');
  const hitRewardGuide = $('#hitRewardGuide');
  const catchRewardGuide = $('#catchRewardGuide');
  const battlePlayerPosition = $('#battlePlayerPosition');
  const battlePlayerName = $('#battlePlayerName');

  attackScreen?.classList.add('is-defense');
  attackScreen?.setAttribute('aria-label', '수비 모드 골드 파밍 화면');
  $$('.attack-only').forEach((element) => element.classList.add('is-hidden'));
  defenseRuleLegend?.classList.remove('is-hidden');

  if (battleInfoKicker) battleInfoKicker.textContent = '수비 모드 · 골드 파밍';
  if (monsterNameDisplay) {
    monsterNameDisplay.classList.add('is-hidden');
  }
  if (battleGuideText) {
    battleGuideText.innerHTML =
      '투구 결과에 따라 골드를 수집할 수 있습니다.<br />' +
      '골드를 모아 선수의 능력치를 강화하고 다시 도전하세요!';
  }
  if (hitRewardGuide) hitRewardGuide.textContent = `+${rewards.hit}G`;
  if (catchRewardGuide) catchRewardGuide.textContent = `+${rewards.catch}G`;
  if (battlePlayerPosition) battlePlayerPosition.textContent = '1선발';
  if (battlePlayerName) {
    battlePlayerName.textContent = gameState.representativePlayer.pitcherName || '이름 입력';
  }
  if (battleBatter) {
    battleBatter.alt = '대표 투수';
    battleBatter.src = battleBatter.getAttribute('src') || DEFENSE_FRAMES[0];
  }
  if (battleMonster) {
    const monsterScale = getMonsterStageScale(gameState.currentStage);
    battleMonster.style.setProperty('--monster-stage-scale', String(monsterScale));
    battleMonster.style.setProperty('--monster-hit-scale', String(monsterScale * 0.98));
  }

  renderCommonStatus();
}

function renderAttackScreen() {
  if (gameState.currentMode === 'defense') {
    renderDefenseScreen();
    return;
  }

  const config = getAttackConfigForStage(gameState.currentStage);
  const monsterHpText = $('#monsterHpText');
  const monsterHpFill = $('#monsterHpFill');
  const attackTimer = $('#attackTimer');
  const timerBox = attackTimer?.closest('.timer-box');
  const battleBatter = $('#battleBatter');
  const battleMonster = $('#battleMonster');
  const monsterNameDisplay = $('#monsterNameDisplay');
  const attackScreen = $('#attackScreen');
  const battleInfoKicker = $('#battleInfoKicker');
  const battleGuideText = $('#battleGuideText');
  const defenseRuleLegend = $('#defenseRuleLegend');

  attackScreen?.classList.remove('is-defense');
  attackScreen?.setAttribute('aria-label', '공격 모드 튜토리얼 화면');
  $$('.attack-only').forEach((element) => element.classList.remove('is-hidden'));
  defenseRuleLegend?.classList.add('is-hidden');
  hideDefenseRuleTooltip();
  if (battleInfoKicker) battleInfoKicker.textContent = '튜토리얼 몬스터';
  if (battleGuideText) {
    battleGuideText.textContent =
      '제한 시간 내에 몬스터를 격파하세요! 시간이 0이 되면 몬스터가 도망갑니다.';
  }

  if (monsterNameDisplay) {
    monsterNameDisplay.classList.remove('is-hidden');
    monsterNameDisplay.innerHTML = `${config.monsterName} <span class="monster-level">Lv . ${config.monsterLevel}</span>`;
  }

  const battlePlayerPosition = $('#battlePlayerPosition');
  const battlePlayerName = $('#battlePlayerName');
  const playerPosition = getSelectedPositionName() || '선택 필요';
  const playerName = gameState.representativePlayer.name || '이름 입력';

  if (battlePlayerPosition) {
    battlePlayerPosition.textContent = playerPosition;
  }

  if (battlePlayerName) {
    battlePlayerName.textContent = playerName;
  }

  if (battleMonster) {
    const monsterScale = getMonsterStageScale(gameState.currentStage);
    battleMonster.style.setProperty('--monster-stage-scale', String(monsterScale));
    battleMonster.style.setProperty('--monster-hit-scale', String(monsterScale * 0.98));
  }

  renderCommonStatus();

  if (monsterHpText) {
    monsterHpText.textContent = `${Math.max(0, attackState.hp)} / ${config.maxHp}`;
  }

  if (monsterHpFill) {
    const hpRatio = Math.max(0, Math.min(1, attackState.hp / config.maxHp));
    monsterHpFill.style.width = `${hpRatio * 100}%`;
  }

  if (attackTimer) {
    const safeTimeLeft = Math.max(0, attackState.timeLeft);
    attackTimer.textContent = String(safeTimeLeft);
    timerBox?.classList.toggle('is-danger', safeTimeLeft <= 10);
  }

  if (battleBatter && !battleBatter.getAttribute('src')) {
    battleBatter.src = ATTACK_FRAMES[0];
  }

  if (battleMonster && !battleMonster.getAttribute('src')) {
    battleMonster.src = MONSTER_IMAGES.normal;
  }
}

function setBatterFrame(frameIndex) {
  const battleBatter = $('#battleBatter');
  if (!battleBatter) return;

  battleBatter.src = ATTACK_FRAMES[frameIndex] ?? ATTACK_FRAMES[0];
}

function setMonsterImage(state) {
  const battleMonster = $('#battleMonster');
  if (!battleMonster) return;

  battleMonster.src = MONSTER_IMAGES[state] ?? MONSTER_IMAGES.normal;
  battleMonster.classList.toggle('is-hit', state === 'hit');
  battleMonster.classList.toggle('is-crying', state === 'crying');
}

function showDamagePopup(damage, isCritical) {
  const damagePopup = $('#damagePopup');
  if (!damagePopup) return;

  damagePopup.className = 'damage-popup';
  void damagePopup.offsetWidth;
  damagePopup.innerHTML = isCritical
    ? `치명타!<br />-${damage}`
    : `기본 데미지<br />-${damage}`;
  damagePopup.classList.add('is-visible');
}

function setPitcherFrame(frameIndex) {
  const battleBatter = $('#battleBatter');
  if (!battleBatter) return;

  battleBatter.src = DEFENSE_FRAMES[frameIndex] ?? DEFENSE_FRAMES[0];
}

function showDefenseResult(title, detail = '', resultType = '') {
  const damagePopup = $('#damagePopup');
  if (!damagePopup) return;

  const resultSymbols = {
    hit: '✓',
    miss: '×',
    'monster-hit': '!',
    catch: '★',
  };

  damagePopup.className = 'damage-popup defense-result-popup';
  if (resultType) damagePopup.classList.add(`is-${resultType}`);
  damagePopup.innerHTML =
    `<i class="result-symbol" aria-hidden="true">${resultSymbols[resultType] ?? ''}</i>` +
    `<span class="defense-result-copy"><strong>${title}</strong>` +
    `${detail ? `<span>${detail}</span>` : ''}</span>`;
  void damagePopup.offsetWidth;
  damagePopup.classList.add('is-visible');
}

function addDefenseGold(amount) {
  gameState.gold = Math.max(0, Math.floor(gameState.gold + amount));
  saveGameState();
  renderCommonStatus();
}

function completeDefensePitchTutorialStep() {
  if (gameState.tutorialFlags.defenseSupportGranted) return;

  gameState.tutorialFlags.firstDefensePitchCount = Math.min(
    3,
    normalizeNumber(gameState.tutorialFlags.firstDefensePitchCount) + 1
  );

  if (gameState.tutorialFlags.firstDefensePitchCount < 3) {
    saveGameState();
    return;
  }

  gameState.tutorialFlags.defenseSupportGranted = true;
  gameState.gold += 100;
  saveGameState();
  renderCommonStatus();
  stopDefenseMode();
  setDefenseSupportPending(true);

  window.clearTimeout(defenseSupportModalTimerId);
  defenseSupportModalTimerId = window.setTimeout(showDefenseSupportModal, 700);
}

function resolveDefensePitch() {
  if (!defenseState.isRunning) return;

  const rewards = getDefenseRewards();
  const isFirstTutorialPitch = !gameState.tutorialFlags.firstDefenseHitDone;
  const isHit = isFirstTutorialPitch || Math.random() < getPitcherHitChance();

  if (!isHit) {
    setMonsterImage('normal');
    showDefenseResult('Miss', '골드 획득 없음', 'miss');
    completeDefensePitchTutorialStep();
    return;
  }

  const isMonsterHit = !isFirstTutorialPitch && Math.random() < DEFENSE_CONFIG.monsterHitChance;

  if (!isMonsterHit) {
    setMonsterImage('hit');
    addDefenseGold(rewards.hit);
    showDefenseResult('Hit!', `+${rewards.hit}G`, 'hit');

    if (isFirstTutorialPitch) {
      gameState.tutorialFlags.firstDefenseHitDone = true;
      saveGameState();
      showToast('첫 투구 성공! 수비 모드에서 골드를 모아 공격 선수를 강화하세요.');
    }
    completeDefensePitchTutorialStep();
    return;
  }

  const isCatch = Math.random() < getFielderCatchChance();

  if (isCatch) {
    setMonsterImage('crying');
    addDefenseGold(rewards.catch);
    showDefenseResult('Catch!', `+${rewards.catch}G`, 'catch');
    completeDefensePitchTutorialStep();
    return;
  }

  setMonsterImage('proud');
  addDefenseGold(-1);
  showDefenseResult('Monster Hit', '-1G', 'monster-hit');
  completeDefensePitchTutorialStep();
}

function performDefenseCycle() {
  if (!defenseState.isRunning) return;

  clearDefenseTimeouts();
  setPitcherFrame(0);
  setMonsterImage('normal');

  const frame2TimeoutId = window.setTimeout(() => {
    if (!defenseState.isRunning) return;
    setPitcherFrame(1);
  }, DEFENSE_CONFIG.frame2DelayMs);

  const frame3TimeoutId = window.setTimeout(() => {
    if (!defenseState.isRunning) return;
    setPitcherFrame(2);
  }, DEFENSE_CONFIG.frame3DelayMs);

  const resultTimeoutId = window.setTimeout(() => {
    if (!defenseState.isRunning) return;
    resolveDefensePitch();
  }, DEFENSE_CONFIG.resultDelayMs);

  const resetTimeoutId = window.setTimeout(() => {
    if (!defenseState.isRunning) return;
    setPitcherFrame(0);
    setMonsterImage('normal');
  }, DEFENSE_CONFIG.resetDelayMs);

  defenseTimeoutIds.push(
    frame2TimeoutId,
    frame3TimeoutId,
    resultTimeoutId,
    resetTimeoutId
  );
}

function startDefenseMode() {
  stopAttackTutorial();
  stopDefenseMode();
  window.clearTimeout(defenseSupportModalTimerId);
  setDefenseSupportPending(false);
  setPlayerTabGuidance(false);

  gameState.currentMode = 'defense';
  saveGameState();
  defenseState = { isRunning: true };

  setPitcherFrame(0);
  setMonsterImage('normal');
  hideAllModals();
  showScreen('attack');
  renderDefenseScreen();

  performDefenseCycle();
  defenseLoopId = window.setInterval(performDefenseCycle, DEFENSE_CONFIG.pitchCycleMs);
}

function applyTutorialDamage() {
  if (!attackState.isRunning || attackState.isCleared) {
    return;
  }

  const config = getAttackConfigForStage(gameState.currentStage);
  const isCritical = Math.random() < config.criticalChance;
  const damage = isCritical ? config.attackDamage * 2 : config.attackDamage;

  attackState.hp = Math.max(0, attackState.hp - damage);
  setMonsterImage('hit');
  showDamagePopup(damage, isCritical);
  renderAttackScreen();

  if (attackState.hp <= 0) {
    attackState.isCleared = true;
    const clearTimeoutId = window.setTimeout(showStageClearModal, 520);
    attackTimeoutIds.push(clearTimeoutId);
  }
}

function performAttackCycle() {
  if (!attackState.isRunning || attackState.isCleared) {
    return;
  }

  const config = getAttackConfigForStage(gameState.currentStage);
  clearAttackTimeouts();
  setBatterFrame(0);
  setMonsterImage('normal');

  const frame2TimeoutId = window.setTimeout(() => {
    if (!attackState.isRunning || attackState.isCleared) return;
    setBatterFrame(1);
  }, config.frame2DelayMs);

  const frame3TimeoutId = window.setTimeout(() => {
    if (!attackState.isRunning || attackState.isCleared) return;
    setBatterFrame(2);
    applyTutorialDamage();
  }, config.frame3DelayMs);

  const resetTimeoutId = window.setTimeout(() => {
    if (!attackState.isRunning || attackState.isCleared) return;
    setBatterFrame(0);
    setMonsterImage('normal');
  }, config.resetDelayMs);

  attackTimeoutIds.push(frame2TimeoutId, frame3TimeoutId, resetTimeoutId);
}

function startAttackTutorial() {
  stopAttackTutorial();
  stopDefenseMode();

  const config = getAttackConfigForStage(gameState.currentStage);
  gameState.currentMode = 'attack';
  saveGameState();

  attackState = createAttackState();
  setBatterFrame(0);
  setMonsterImage('normal');
  hideAllModals();
  showScreen('attack');
  renderAttackScreen();

  attackState.isRunning = true;

  attackTimerId = window.setInterval(() => {
    if (!attackState.isRunning || attackState.isCleared) return;

    attackState.timeLeft -= 1;
    renderAttackScreen();

    if (attackState.timeLeft <= 0 && attackState.hp > 0) {
      failAttackTutorial();
    }
  }, 1000);

  performAttackCycle();
  attackLoopId = window.setInterval(performAttackCycle, config.attackCycleMs);
}

function failAttackTutorial() {
  stopAttackTutorial();
  setMonsterImage('proud');

  const stage = gameState.currentStage;

  if (stage === 1) {
    showToast('시간 종료! 튜토리얼이라 다시 도전할 수 있어요.');
    const retryTimeoutId = window.setTimeout(startAttackTutorial, 1600);
    attackTimeoutIds.push(retryTimeoutId);
  } else {
    // Stage 2 이상: 팝업 띄우기
    showStageFailModal();
  }
}

function hideAllModals() {
  hideStageClearModal();
  hideStageFailModal();
  hideDefenseSupportModal();
}

function showStageClearModal() {
  stopAttackTutorial();
  setBatterFrame(0);
  setMonsterImage('hit');

  gameState.tutorialFlags.stage1Cleared = true;
  saveGameState();

  $('#stageClearModal')?.classList.remove('is-hidden');
}

function hideStageClearModal() {
  $('#stageClearModal')?.classList.add('is-hidden');
}

function showStageFailModal() {
  const stageFailModal = $('#stageFailModal');
  if (!stageFailModal) return;

  stageFailModal.classList.remove('is-hidden');
}

function hideStageFailModal() {
  $('#stageFailModal')?.classList.add('is-hidden');
}

function switchToDefenseMode() {
  hideStageFailModal();
  gameState.currentMode = 'defense';
  saveGameState();
  renderRepresentativeScreen();
  showScreen('representative');
  showToast('대표 투수 설정 화면으로 이동합니다.');
}

function confirmStageClear() {
  hideStageClearModal();
  gameState.currentStage = 2;
  gameState.currentMode = 'attack';
  saveGameState();
  renderCommonStatus();
  
  // Stage 2로 시작
  startAttackTutorial();
}

function initStartScreen() {
  $('#startButton')?.addEventListener('click', handleGameStart);

  $('#settingsButton')?.addEventListener('click', () => {
    moveToPage(PAGE_CONFIG.settingsPage, '설정 화면은 다음 단계에서 연결할 예정입니다.');
  });
}

function handleBottomNavigation(button) {
  const target = button.dataset.target;
  const currentScreenId = button.closest('section')?.id;

  if (gameState.tutorialFlags.playerTabGuidanceActive) {
    if (target === 'players') {
      showToast('선수 화면은 다음 단계에서 연결할 예정입니다.');
      return;
    }

    showToast('지금은 선수 탭만 선택할 수 있습니다.');
    return;
  }

  // Keep every tutorial step on its intended path, including setup screens and result modals.
  if (isTutorialInProgress()) {
    showToast('튜토리얼 진행 중에는 하단 메뉴를 이용할 수 없습니다.');
    return;
  }

  if (target === 'game') {
    if (currentScreenId === 'attackScreen') {
      showToast('현재 경기 화면입니다.');
      return;
    }

    if (!gameState.tutorialFlags.representativeBatterSet) {
      showToast('먼저 대표 타자를 설정해 주세요.');
      return;
    }

    if (gameState.currentMode === 'defense') {
      startDefenseMode();
    } else {
      startAttackTutorial();
    }
    return;
  }

  if (target === 'players') {
    showScreen('representative');
    return;
  }

  const targetPageMap = {
    synergy: PAGE_CONFIG.synergyPage,
    log: PAGE_CONFIG.logPage,
    settings: PAGE_CONFIG.settingsPage,
  };

  const fallbackMap = {
    synergy: '시너지 화면은 다음 단계에서 연결할 예정입니다.',
    log: '로그 화면은 다음 단계에서 연결할 예정입니다.',
    settings: '설정 화면은 다음 단계에서 연결할 예정입니다.',
  };

  moveToPage(targetPageMap[target], fallbackMap[target] ?? '해당 화면은 다음 단계에서 연결할 예정입니다.');
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

  $('#playerNameInput')?.addEventListener('input', updateRepresentativePreview);

  $('#playerNameInput')?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      completeRepresentativeSetup();
    }
  });

  $('#nameSetupButton')?.addEventListener('click', completeRepresentativeSetup);

  renderRepresentativeScreen();
}

function initAttackScreen() {
  $('#stageClearConfirmButton')?.addEventListener('click', confirmStageClear);
  $('#stageFailDefenseButton')?.addEventListener('click', switchToDefenseMode);
  $('#defenseSupportConfirmButton')?.addEventListener('click', beginPlayerTabGuidance);
  $$('.defense-rule-item').forEach((button) => {
    button.addEventListener('click', () => {
      showDefenseRuleTooltip(button);
    });
  });
}

function initBottomNavigation() {
  $$('.bottom-nav-button').forEach((button) => {
    button.addEventListener('click', () => handleBottomNavigation(button));
  });
}

function initGame() {
  initStartScreen();
  initRepresentativeScreen();
  initAttackScreen();
  initBottomNavigation();
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
    renderAttackScreen();
  },
  addGold(amount) {
    gameState.gold = Math.max(0, Math.floor(gameState.gold + normalizeNumber(amount)));
    saveGameState();
    renderRepresentativeScreen();
    renderAttackScreen();
  },
  resetSave() {
    stopAttackTutorial();
    stopDefenseMode();
    window.clearTimeout(defenseSupportModalTimerId);
    setDefenseSupportPending(false);
    setPlayerTabGuidance(false);
    gameState = cloneDefaultState();
    attackState = createAttackState();
    saveGameState();
    renderRepresentativeScreen();
    renderAttackScreen();
    showScreen('start');
  },
};

initGame();
