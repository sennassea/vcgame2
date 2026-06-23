const STORAGE_KEY = 'baseballMonsterHunterSave';
const MAX_GOLD = 50000;

const PAGE_CONFIG = {
  // 다음 화면을 별도 파일로 만들면 null 대신 실제 파일명을 넣으면 됩니다.
  // 예: stage2Page: 'stage2.html', settingsPage: 'settings.html'
  stage2Page: null,
  shopPage: null,
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

const PLAYER_POSITION_ORDER = [
  'catcher',
  'first',
  'second',
  'third',
  'shortstop',
  'left',
  'center',
  'right',
];

const PLAYER_PROFILE_IMAGES = {
  representative: 'assets/player-representative.png',
  locked: 'assets/player-locked.png',
  pitcher: 'assets/player-pitcher.png',
  catcher: 'assets/player-catcher.png',
  infielder: 'assets/player-infielder.png',
  outfielder: 'assets/player-outfielder.png',
};

const SYNERGY_CONFIG = {
  battery: {
    name: '배터리팀',
    subtitle: 'BATTERY TEAM',
    positions: ['pitcher', 'catcher'],
    effectName: '골드 획득량 증가',
    effectPerStage: 1,
    effectUnit: '%',
    className: 'battery',
  },
  infield: {
    name: '내야팀',
    subtitle: 'INFIELD TEAM',
    positions: ['first', 'second', 'third', 'shortstop'],
    effectName: 'Catch 아웃 확률 증가',
    effectPerStage: 1,
    effectUnit: '%p',
    className: 'infield',
  },
  outfield: {
    name: '외야팀',
    subtitle: 'OUTFIELD TEAM',
    positions: ['left', 'center', 'right'],
    effectName: '치명타 확률 증가',
    effectPerStage: 1,
    effectUnit: '%p',
    className: 'outfield',
  },
};

const SYNERGY_POSITION_INFO = {
  pitcher: { name: '투수', image: 'assets/synergy-pitcher.png' },
  catcher: { name: '포수', image: 'assets/synergy-catcher.png' },
  first: { name: '1루수', image: 'assets/synergy-first.png' },
  second: { name: '2루수', image: 'assets/synergy-second.png' },
  third: { name: '3루수', image: 'assets/synergy-third.png' },
  shortstop: { name: '유격수', image: 'assets/synergy-shortstop.png' },
  left: { name: '좌익수', image: 'assets/synergy-left.png' },
  center: { name: '중견수', image: 'assets/synergy-center.png' },
  right: { name: '우익수', image: 'assets/synergy-right.png' },
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
    pitcherLevel: 1,
    attack: 10,
    goldGain: 5,
  },
  fieldPlayers: {
    catcher: { unlocked: false, name: '', level: 1, attack: 10 },
    first: { unlocked: false, name: '', level: 1, attack: 10 },
    second: { unlocked: false, name: '', level: 1, attack: 10 },
    third: { unlocked: false, name: '', level: 1, attack: 10 },
    shortstop: { unlocked: false, name: '', level: 1, attack: 10 },
    left: { unlocked: false, name: '', level: 1, attack: 10 },
    center: { unlocked: false, name: '', level: 1, attack: 10 },
    right: { unlocked: false, name: '', level: 1, attack: 10 },
  },
  settings: {
    volume: 20,
    bgmVolumes: {
      main: 20,
      attack: 20,
      defense: 20,
    },
    sfxVolume: 70,
    muted: false,
  },
  claimedStageRewards: {},
  goldCapNotified: false,
  tutorialFlags: {
    representativeBatterSet: false,
    representativePitcherSet: false,
    stage1Cleared: false,
    firstDefenseHitDone: false,
    firstDefensePitchCount: 0,
    defenseSupportGranted: false,
    playerTabGuidanceActive: false,
    tutorialStep: '',
    stage2Cleared: false,
    synergySupportGranted: false,
    firstBasemanRecruitedForSynergy: false,
    tutorialComplete: false,
    tutorialCompletionRewardGranted: false,
  },
};

const STAGE_CONFIGS = {
  1: {
    monsterName: 'A 몬스터',
    monsterLevel: 1,
    maxHp: 50,
    timeLimit: 30,
    attackDamage: 10,
    criticalChance: 0.05,
    attackCycleMs: 2000,
    frame2DelayMs: 520,
    frame3DelayMs: 1040,
    resetDelayMs: 1450,
  },
  2: {
    monsterName: 'A 몬스터',
    monsterLevel: 2,
    maxHp: 200,
    timeLimit: 30,
    attackDamage: 10,
    criticalChance: 0.05,
    attackCycleMs: 2000,
    frame2DelayMs: 520,
    frame3DelayMs: 1040,
    resetDelayMs: 1450,
  },
  3: {
    monsterName: 'A 몬스터',
    monsterLevel: 3,
    maxHp: 700,
    timeLimit: 30,
    attackDamage: 10,
    criticalChance: 0.05,
    attackCycleMs: 2000,
    frame2DelayMs: 520,
    frame3DelayMs: 1040,
    resetDelayMs: 1450,
  },
  4: {
    monsterName: 'A 몬스터',
    monsterLevel: 4,
    maxHp: 1000,
    timeLimit: 30,
    attackDamage: 10,
    criticalChance: 0.05,
    attackCycleMs: 2000,
    frame2DelayMs: 520,
    frame3DelayMs: 1040,
    resetDelayMs: 1450,
  },
  5: {
    monsterName: 'A 몬스터',
    monsterLevel: 5,
    maxHp: 1500,
    timeLimit: 30,
    attackDamage: 10,
    criticalChance: 0.05,
    attackCycleMs: 2000,
    frame2DelayMs: 520,
    frame3DelayMs: 1040,
    resetDelayMs: 1450,
  },
  6: {
    monsterName: 'A 몬스터',
    monsterLevel: 6,
    maxHp: 2500,
    timeLimit: 30,
    attackDamage: 10,
    criticalChance: 0.05,
    attackCycleMs: 2000,
    frame2DelayMs: 520,
    frame3DelayMs: 1040,
    resetDelayMs: 1450,
  },
  7: {
    monsterName: 'A 몬스터',
    monsterLevel: 7,
    maxHp: 4000,
    timeLimit: 30,
    attackDamage: 10,
    criticalChance: 0.05,
    attackCycleMs: 2000,
    frame2DelayMs: 520,
    frame3DelayMs: 1040,
    resetDelayMs: 1450,
  },
  8: {
    monsterName: 'A 몬스터',
    monsterLevel: 8,
    maxHp: 6000,
    timeLimit: 30,
    attackDamage: 10,
    criticalChance: 0.05,
    attackCycleMs: 2000,
    frame2DelayMs: 520,
    frame3DelayMs: 1040,
    resetDelayMs: 1450,
  },
  9: {
    monsterName: 'A 몬스터',
    monsterLevel: 9,
    maxHp: 8000,
    timeLimit: 30,
    attackDamage: 10,
    criticalChance: 0.05,
    attackCycleMs: 2000,
    frame2DelayMs: 520,
    frame3DelayMs: 1040,
    resetDelayMs: 1450,
  },
  10: {
    monsterName: 'A 몬스터 BOSS',
    monsterLevel: 10,
    isBoss: true,
    maxHp: 10000,
    timeLimit: 30,
    attackDamage: 10,
    criticalChance: 0.05,
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
  boss: 'assets/monster-boss.png',
};

const BOSS_MONSTER_IMAGES = {
  normal: 'assets/monster-boss.png',
  proud: 'assets/monster-boss-proud.png',
  hit: 'assets/monster-boss-hit.png',
  crying: 'assets/monster-boss-hit.png',
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

let toastTimer = null;
let statusInfoTooltipTimer = null;
let defenseRuleTooltipTimer = null;
let attackTimerId = null;
let attackLoopId = null;
let attackTimerBeepFrameId = null;
let attackTimeoutIds = [];
let defenseLoopId = null;
let defenseTimeoutIds = [];
let defenseSupportModalTimerId = null;
let selectedRecruitPosition = '';
let selectedPlayerTarget = '';
let settingsReturnScreen = 'attack';
let gameState = loadGameState();
let attackState = createAttackState();
let defenseState = { isRunning: false };
let bgmTracks = null;
let activeBgmKey = '';
let hasBgmInteraction = false;
let timerAudioContext = null;
let sfxTracks = null;

const BGM_SOURCES = {
  main: 'sounds/main-background.mp3',
  attack: 'sounds/attack-mode.mp3',
  defense: 'sounds/defense-mode.mp3',
};

const SFX_SOURCES = {
  pitch: 'sounds/pitch-throw.mp3',
  swing: 'sounds/bat-swing.mp3',
};

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
    const savedFieldPlayers = parsedData.fieldPlayers ?? {};
    const savedSettings = parsedData.settings ?? {};
    const legacyVolume = Math.max(
      0,
      Math.min(100, normalizeNumber(savedSettings.volume, defaultState.settings.volume))
    );

    return {
      ...defaultState,
      ...parsedData,
      gold: Math.max(0, Math.min(MAX_GOLD, Math.floor(normalizeNumber(parsedData.gold)))),
      goldCapNotified:
        Boolean(parsedData.goldCapNotified) &&
        normalizeNumber(parsedData.gold) >= MAX_GOLD,
      representativePlayer: {
        ...defaultState.representativePlayer,
        ...(parsedData.representativePlayer ?? {}),
      },
      fieldPlayers: Object.fromEntries(
        PLAYER_POSITION_ORDER.map((position) => [
          position,
          {
            ...defaultState.fieldPlayers[position],
            ...(savedFieldPlayers[position] ?? {}),
          },
        ])
      ),
      tutorialFlags: {
        ...defaultState.tutorialFlags,
        ...(parsedData.tutorialFlags ?? {}),
      },
      settings: {
        ...defaultState.settings,
        ...savedSettings,
        bgmVolumes: {
          main: legacyVolume,
          attack: legacyVolume,
          defense: legacyVolume,
          ...(savedSettings.bgmVolumes ?? {}),
        },
      },
      claimedStageRewards: {
        ...defaultState.claimedStageRewards,
        ...(parsedData.claimedStageRewards ?? {}),
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

function showGoldCapModal() {
  $('#goldCapModal')?.classList.remove('is-hidden');
}

function setGoldAmount(value, { notifyCap = true } = {}) {
  const previousGold = gameState.gold;
  gameState.gold = Math.max(0, Math.min(MAX_GOLD, Math.floor(normalizeNumber(value))));

  if (gameState.gold < MAX_GOLD) {
    gameState.goldCapNotified = false;
  }

  if (
    notifyCap &&
    previousGold < MAX_GOLD &&
    gameState.gold >= MAX_GOLD &&
    !gameState.goldCapNotified
  ) {
    gameState.goldCapNotified = true;
    window.setTimeout(showGoldCapModal, 80);
  }

  return gameState.gold;
}

function changeGold(amount, options) {
  return setGoldAmount(gameState.gold + normalizeNumber(amount), options);
}

function getModeName(mode) {
  return mode === 'defense' ? '수비' : '공격';
}

function getMonsterStageScale(stage) {
  const normalizedStage = Math.max(1, Math.floor(normalizeNumber(stage, 1)));
  const cappedStage = Math.min(normalizedStage, 10);
  return 1 + (cappedStage - 1) * (1.45 / 9);
}

function getResultPopupTop(stage) {
  const normalizedStage = Math.max(1, Math.min(10, Math.floor(normalizeNumber(stage, 1))));
  return 46 - (normalizedStage - 1) * (26 / 9);
}

function getResultPopupRight(stage) {
  const normalizedStage = Math.max(1, Math.min(10, Math.floor(normalizeNumber(stage, 1))));
  return 64 + (normalizedStage - 1) * (116 / 9);
}

function applyBattleStagePresentation() {
  const battleStage = $('.battle-stage');
  const battleMonster = $('#battleMonster');
  const monsterScale = getMonsterStageScale(gameState.currentStage);

  battleMonster?.style.setProperty('--monster-stage-scale', String(monsterScale));
  battleMonster?.style.setProperty('--monster-hit-scale', String(monsterScale * 0.98));
  battleStage?.style.setProperty('--result-popup-top', `${getResultPopupTop(gameState.currentStage)}%`);
  battleStage?.style.setProperty('--result-popup-right', `${getResultPopupRight(gameState.currentStage)}px`);
}

function getAttackConfigForStage(stage) {
  const normalizedStage = Math.max(1, Math.floor(normalizeNumber(stage, 1)));
  return STAGE_CONFIGS[normalizedStage] ?? STAGE_CONFIGS[1];
}

function getStageMonsterDisplayName(config) {
  return config.isBoss
    ? config.monsterName
    : `${config.monsterName} Lv . ${config.monsterLevel}`;
}

function getStageClearReward(stage) {
  if (stage >= 3 && stage <= 9) return 300;
  if (stage === 10) return 1000;
  return 0;
}

function getDefenseRewards() {
  const stageMultiplier = 1 + (Math.max(1, gameState.currentStage) - 1) * 0.15;
  const batterySynergyMultiplier = 1 + getSynergyEffectValue('battery') / 100;
  const pitcherLevelBonus = Math.max(
    1,
    Math.floor(normalizeNumber(gameState.representativePlayer.pitcherLevel, 1))
  );

  return {
    hit: Math.round(10 * stageMultiplier * batterySynergyMultiplier) + pitcherLevelBonus,
    catch: Math.round(20 * stageMultiplier * batterySynergyMultiplier),
  };
}

function getPitcherHitChance() {
  return Math.min(
    0.5 + (gameState.representativePlayer.pitcherLevel - 1) * 0.005,
    0.85
  );
}

function getFielderCatchChance() {
  return Math.min(0.1 + getSynergyEffectValue('infield') / 100, 0.6);
}

function getAttackCriticalChance(stage = gameState.currentStage) {
  const config = getAttackConfigForStage(stage);
  return Math.min(
    config.criticalChance + getSynergyEffectValue('outfield') / 100,
    0.5
  );
}

function getPositionRosterState(position) {
  const representative = gameState.representativePlayer;

  if (position === 'pitcher') {
    return {
      owned: Boolean(gameState.tutorialFlags.representativePitcherSet || representative.pitcherName),
      level: representative.pitcherLevel,
    };
  }

  if (representative.position === position && gameState.tutorialFlags.representativeBatterSet) {
    return { owned: true, level: representative.level };
  }

  const player = gameState.fieldPlayers[position];
  return {
    owned: Boolean(player?.unlocked),
    level: player?.level ?? 1,
  };
}

function getSynergyState(teamKey) {
  const config = SYNERGY_CONFIG[teamKey];
  const members = config.positions.map((position) => ({
    position,
    ...getPositionRosterState(position),
  }));
  const active = members.every((member) => member.owned);
  const minimumLevel = active ? Math.min(...members.map((member) => member.level)) : 0;
  const step = active ? 1 + Math.floor(minimumLevel / 10) : 0;
  const nextRequiredLevel = active ? step * 10 : 1;

  return { ...config, members, active, minimumLevel, step, nextRequiredLevel };
}

function getSynergyEffectValue(teamKey) {
  const state = getSynergyState(teamKey);

  if (teamKey === 'battery') {
    if (state.step <= 0) return 0;
    if (state.step === 1) return 1;
    return (state.step - 1) * 5;
  }

  if (teamKey === 'outfield') {
    if (state.step <= 0) return 0;
    if (state.step === 1) return 1;
    return (state.step - 1) * 3;
  }

  return state.step * state.effectPerStage;
}

function getLevelUpCost(level) {
  return Math.floor(50 * (1.18 ** (Math.max(1, level) - 1)));
}

function formatPercent(value) {
  const percent = value * 100;
  return `${Number.isInteger(percent) ? percent : percent.toFixed(1)}%`;
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
  return gameState.currentMode === 'defense' ? 'Hit 확률' : '공격력';
}

function getRepresentativeStatValue() {
  const player = gameState.representativePlayer;
  return gameState.currentMode === 'defense'
    ? formatPercent(getPitcherHitChance())
    : player.attack;
}

function isTutorialInProgress() {
  return !gameState.tutorialFlags.tutorialComplete;
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

function hideStatusInfoTooltip() {
  window.clearTimeout(statusInfoTooltipTimer);
  $('#statusInfoTooltip')?.classList.add('is-hidden');
}

function showStatusInfoTooltip(slot) {
  const tooltip = $('#statusInfoTooltip');
  const shell = $('.game-shell');
  const screen = slot.closest('section');
  if (!tooltip || !shell || !screen) return;

  const isGold = slot.classList.contains('status-slot--gold');
  tooltip.textContent = isGold
    ? `골드는 최대 ${MAX_GOLD.toLocaleString('ko-KR')}G까지 보관할 수 있습니다.`
    : '스테이지 1~9에는 일반 몬스터가 등장하고, 스테이지 10에는 보스 몬스터가 등장합니다.';
  tooltip.style.width = isGold ? '180px' : '220px';
  tooltip.classList.remove('is-hidden');

  const shellRect = shell.getBoundingClientRect();
  const screenRect = screen.getBoundingClientRect();
  const slotRect = slot.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();
  const slotCenter = slotRect.left - shellRect.left + slotRect.width / 2;
  const screenLeft = screenRect.left - shellRect.left;
  const screenRight = screenRect.right - shellRect.left;
  const left = Math.max(
    screenLeft + 8,
    Math.min(screenRight - tooltipRect.width - 8, slotCenter - tooltipRect.width / 2)
  );

  tooltip.style.left = `${left}px`;
  tooltip.style.top = `${slotRect.bottom - shellRect.top + 6}px`;
  tooltip.style.setProperty(
    '--tooltip-arrow-left',
    `${Math.max(13, Math.min(tooltipRect.width - 13, slotCenter - left))}px`
  );

  window.clearTimeout(statusInfoTooltipTimer);
  statusInfoTooltipTimer = window.setTimeout(hideStatusInfoTooltip, 3200);
}

function initStatusInfoTooltips() {
  $$('.status-slot--gold, .status-slot--stage').forEach((slot) => {
    slot.setAttribute('role', 'button');
    slot.setAttribute('tabindex', '0');
    slot.setAttribute(
      'aria-label',
      slot.classList.contains('status-slot--gold')
        ? '골드 최대 보관 한도 안내'
        : '스테이지 몬스터 안내'
    );
    slot.addEventListener('click', (event) => {
      event.stopPropagation();
      playSynthesizedSfx('click');
      showStatusInfoTooltip(slot);
    });
    slot.addEventListener('keydown', (event) => {
      if (!['Enter', ' '].includes(event.key)) return;
      event.preventDefault();
      playSynthesizedSfx('click');
      showStatusInfoTooltip(slot);
    });
  });

  document.addEventListener('click', hideStatusInfoTooltip);
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

  if (attackTimerBeepFrameId) {
    window.cancelAnimationFrame(attackTimerBeepFrameId);
    attackTimerBeepFrameId = null;
  }

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

function playAttackTimerBeep(timeLeft) {
  if (gameState.settings.muted || timeLeft < 1 || timeLeft > 5) return;
  const sfxVolume = getSfxVolume();
  if (sfxVolume <= 0) return;

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;

  timerAudioContext ??= new AudioContextClass();
  const context = timerAudioContext;
  if (context.state === 'suspended') {
    context.resume().catch(() => {});
  }
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const isFinalBeep = timeLeft === 1;
  const startTime = context.currentTime;
  const duration = isFinalBeep ? 0.82 : 0.18;
  const peakVolume = Math.max(0.08, sfxVolume * 0.38);

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(isFinalBeep ? 1040 : 880, startTime);
  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(peakVolume, startTime + 0.012);
  gain.gain.setValueAtTime(peakVolume, startTime + Math.max(0.02, duration - 0.05));
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(startTime);
  oscillator.stop(startTime + duration + 0.02);
}

function getStoredSfxVolume() {
  return Math.max(
    0,
    Math.min(100, Math.floor(normalizeNumber(gameState.settings.sfxVolume, 70)))
  );
}

function getSfxVolume() {
  if (gameState.settings.muted) return 0;
  return Math.min(1, (getStoredSfxVolume() / 100) * 1.2);
}

function playFileSfx(key) {
  const source = sfxTracks?.[key];
  const volume = getSfxVolume();
  if (!source || volume <= 0) return;

  const audio = source.cloneNode();
  audio.volume = volume;
  audio.currentTime = 0;
  audio.play().catch(() => {});
  window.setTimeout(() => {
    audio.pause();
    audio.currentTime = 0;
  }, 1400);
}

function createSfxNoise(context, startTime, duration, volume, filterFrequency = 1000) {
  const frameCount = Math.max(1, Math.floor(context.sampleRate * duration));
  const buffer = context.createBuffer(1, frameCount, context.sampleRate);
  const data = buffer.getChannelData(0);
  for (let index = 0; index < frameCount; index += 1) {
    data[index] = Math.random() * 2 - 1;
  }

  const source = context.createBufferSource();
  const filter = context.createBiquadFilter();
  const gain = context.createGain();
  source.buffer = buffer;
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(filterFrequency, startTime);
  filter.Q.value = 0.8;
  gain.gain.setValueAtTime(volume, startTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(context.destination);
  source.start(startTime);
}

function playSynthesizedSfx(type) {
  const volume = getSfxVolume();
  if (volume <= 0) return;
  const resultVolume = Math.min(1, volume * 1.65);

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;
  timerAudioContext ??= new AudioContextClass();
  const context = timerAudioContext;
  if (context.state === 'suspended') context.resume().catch(() => {});

  const startTime = context.currentTime;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.connect(gain);
  gain.connect(context.destination);

  if (type === 'hit') {
    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(620, startTime);
    oscillator.frequency.exponentialRampToValueAtTime(170, startTime + 0.14);
    gain.gain.setValueAtTime(resultVolume, startTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.18);
    createSfxNoise(context, startTime, 0.16, resultVolume * 0.92, 1900);
    oscillator.start(startTime);
    oscillator.stop(startTime + 0.2);
    return;
  }

  if (type === 'monster-hit') {
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(190, startTime);
    oscillator.frequency.exponentialRampToValueAtTime(58, startTime + 0.45);
    gain.gain.setValueAtTime(resultVolume * 0.75, startTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.55);
    createSfxNoise(context, startTime, 0.4, resultVolume * 0.82, 850);
    oscillator.start(startTime);
    oscillator.stop(startTime + 0.58);
    return;
  }

  if (type === 'click') {
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(520, startTime);
    oscillator.frequency.exponentialRampToValueAtTime(980, startTime + 0.045);
    oscillator.frequency.exponentialRampToValueAtTime(620, startTime + 0.16);
    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.exponentialRampToValueAtTime(resultVolume * 0.86, startTime + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.19);
    oscillator.start(startTime);
    oscillator.stop(startTime + 0.21);
    return;
  }

  if (type === 'celebration') {
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(523.25, startTime);
    oscillator.frequency.setValueAtTime(659.25, startTime + 0.18);
    oscillator.frequency.setValueAtTime(783.99, startTime + 0.36);
    oscillator.frequency.setValueAtTime(1046.5, startTime + 0.54);
    gain.gain.setValueAtTime(resultVolume * 0.28, startTime);
    gain.gain.setValueAtTime(resultVolume * 0.34, startTime + 0.18);
    gain.gain.setValueAtTime(resultVolume * 0.4, startTime + 0.36);
    gain.gain.setValueAtTime(resultVolume * 0.48, startTime + 0.54);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.92);
    createSfxNoise(context, startTime + 0.5, 0.42, resultVolume * 0.18, 2400);
    oscillator.start(startTime);
    oscillator.stop(startTime + 0.94);
    return;
  }

  if (type === 'failure') {
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(392, startTime);
    oscillator.frequency.setValueAtTime(293.66, startTime + 0.2);
    oscillator.frequency.setValueAtTime(196, startTime + 0.42);
    oscillator.frequency.exponentialRampToValueAtTime(98, startTime + 0.72);
    gain.gain.setValueAtTime(resultVolume * 0.38, startTime);
    gain.gain.setValueAtTime(resultVolume * 0.46, startTime + 0.2);
    gain.gain.setValueAtTime(resultVolume * 0.54, startTime + 0.42);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.82);
    createSfxNoise(context, startTime + 0.38, 0.34, resultVolume * 0.14, 520);
    oscillator.start(startTime);
    oscillator.stop(startTime + 0.84);
    return;
  }

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(440, startTime);
  oscillator.frequency.linearRampToValueAtTime(660, startTime + 0.75);
  gain.gain.setValueAtTime(resultVolume * 0.3, startTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.2);
  createSfxNoise(context, startTime, 1.2, resultVolume * 0.62, 1350);
  oscillator.start(startTime);
  oscillator.stop(startTime + 1.22);
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
    if (!['players', 'settings'].includes(button.dataset.target)) {
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
  gameState.tutorialFlags.tutorialStep = 'openPlayersForUpgrade';
  saveGameState();
  setPlayerTabGuidance(true);
  showToast('화살표가 가리키는 선수 탭을 선택하세요.');
}

function setTutorialStep(step) {
  gameState.tutorialFlags.tutorialStep = step;
  saveGameState();
  renderTutorialGuidance();
}

function renderTutorialGuidance() {
  const step = gameState.tutorialFlags.tutorialStep;
  const playersScreen = $('#playersScreen');
  const attackScreen = $('#attackScreen');
  const playersBubble = $('#playersTutorialBubble');
  const attackBubble = $('#attackTutorialBubble');

  [
    'is-upgrade-guided',
    'is-return-game-guided',
    'is-recruit-guided',
    'is-synergy-tab-guided',
  ].forEach((className) => playersScreen?.classList.remove(className));
  attackScreen?.classList.remove('is-mode-switch-guided');
  playersBubble?.classList.add('is-hidden');
  attackBubble?.classList.add('is-hidden');
  $$('.player-upgrade-button, .player-recruit-button, .players-section-tab, [data-mode-switch]')
    .forEach((element) => element.classList.remove('is-tutorial-target'));

  const showPlayersGuide = (title, text) => {
    if ($('#playersTutorialBubbleTitle')) $('#playersTutorialBubbleTitle').textContent = title;
    if ($('#playersTutorialBubbleText')) $('#playersTutorialBubbleText').textContent = text;
    playersBubble?.classList.remove('is-hidden');
  };

  if (step === 'upgradeBatter') {
    playersScreen?.classList.add('is-upgrade-guided');
    showPlayersGuide(
      '대표 타자를 강화하세요!',
      '타자를 레벨업하면 공격력이 올라갑니다. 지원받은 골드로 대표 타자를 한 번 강화해 공격 모드에 다시 도전해 보세요.'
    );
    $('[data-upgrade-player="batter"]')?.classList.add('is-tutorial-target');
  } else if (step === 'upgradePitcher') {
    playersScreen?.classList.add('is-upgrade-guided');
    showPlayersGuide(
      '대표 투수를 강화하세요!',
      '투수를 레벨업하면 Hit 확률이 올라갑니다. 대표 투수를 한 번 강화해 수비 모드에서 더 많은 골드를 획득해 보세요.'
    );
    $('[data-upgrade-player="pitcher"]')?.classList.add('is-tutorial-target');
  } else if (step === 'returnToGame') {
    playersScreen?.classList.add('is-return-game-guided');
    showPlayersGuide('경기로 돌아가요!', '강화가 끝났습니다. 하단의 경기 탭을 눌러 전투 화면으로 돌아가세요.');
  } else if (step === 'switchToAttack') {
    attackScreen?.classList.add('is-mode-switch-guided');
    if ($('#attackTutorialBubbleTitle')) $('#attackTutorialBubbleTitle').textContent = '모드를 전환해 보세요!';
    if ($('#attackTutorialBubbleText')) {
      $('#attackTutorialBubbleText').textContent =
        '상단의 수비 모드 표시를 눌러 공격 모드로 전환한 뒤 Stage 2에 다시 도전하세요.';
    }
    attackBubble?.classList.remove('is-hidden');
    $('#attackScreen [data-mode-switch]')?.classList.add('is-tutorial-target');
  } else if (step === 'recruitFirstBaseman') {
    playersScreen?.classList.add('is-recruit-guided');
    showPlayersGuide(
      '1루수를 영입하세요!',
      '미해금 선수 중 맨 위에 있는 1루수를 영입해 시너지 조합을 준비해 보세요.'
    );
    $('[data-recruit-position="first"]')?.classList.add('is-tutorial-target');
  } else if (step === 'openSynergyTab') {
    playersScreen?.classList.add('is-synergy-tab-guided');
    showPlayersGuide('시너지를 확인하세요!', '상단의 시너지 탭을 눌러 새로 영입한 선수와의 조합을 확인해 보세요.');
    $('#synergyTab')?.classList.add('is-tutorial-target');
  }
}

function showScreen(screenName) {
  const startScreen = $('#startScreen');
  const representativeScreen = $('#representativeScreen');
  const playersScreen = $('#playersScreen');
  const attackScreen = $('#attackScreen');
  const settingsScreen = $('#settingsScreen');

  startScreen?.classList.toggle('is-hidden', screenName !== 'start');
  representativeScreen?.classList.toggle('is-hidden', screenName !== 'representative');
  playersScreen?.classList.toggle('is-hidden', screenName !== 'players');
  attackScreen?.classList.toggle('is-hidden', screenName !== 'attack');
  settingsScreen?.classList.toggle('is-hidden', screenName !== 'settings');
  if (screenName !== 'start') hideQuickSettings();

  if (screenName !== 'attack') {
    stopAttackTutorial();
    stopDefenseMode();
    setDefenseSupportPending(false);
    setPlayerTabGuidance(false);
    hideAllModals();
  }

  if (screenName !== 'players') {
    hideRecruitModals();
    hidePlayerActionModals();
  }

  if (screenName === 'representative') {
    clearRepresentativeFormDraft();
    renderRepresentativeScreen();
    representativeScreen?.querySelector('.representative-scroll-area')?.scrollTo({ top: 0 });
  }

  if (screenName === 'attack') {
    renderAttackScreen();
  }

  if (screenName === 'players') {
    renderPlayersScreen();
    playersScreen?.querySelector('.players-scroll-area')?.scrollTo({ top: 0 });
  }

  if (screenName === 'settings') {
    renderSettingsScreen();
  }

  syncBackgroundMusic();
  renderTutorialGuidance();
}

function handleGameStart() {
  if (gameState.tutorialFlags.tutorialComplete) {
    gameState.currentMode = 'attack';
    saveGameState();
    startAttackTutorial();
    showToast(`Stage ${gameState.currentStage} 공격 모드를 이어서 시작합니다.`);
    return;
  }

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
    ['playersStatusGold', formatGold(gameState.gold)],
    ['playersStatusStage', `Stage ${gameState.currentStage}`],
    ['playersStatusMode', getModeName(gameState.currentMode)],
    ['settingsStatusGold', formatGold(gameState.gold)],
    ['settingsStatusStage', `Stage ${gameState.currentStage}`],
    ['settingsStatusMode', getModeName(gameState.currentMode)],
  ];

  statusItems.forEach(([id, value]) => {
    const element = $(`#${id}`);
    if (element) element.textContent = value;
  });

  renderNavigationLocks();
}

function isShopUnlocked() {
  return gameState.tutorialFlags.tutorialComplete;
}

function renderNavigationLocks() {
  const shopUnlocked = isShopUnlocked();

  $$('.bottom-nav-button[data-target="shop"]').forEach((button) => {
    button.classList.toggle('is-locked', !shopUnlocked);
    button.setAttribute('aria-disabled', String(!shopUnlocked));
    button.setAttribute(
      'aria-label',
      shopUnlocked ? '상점 화면으로 이동' : '상점, 튜토리얼 완료 후 해금'
    );
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
  if (playerLevel) {
    const displayedLevel =
      gameState.currentMode === 'defense' ? player.pitcherLevel : player.level;
    playerLevel.textContent = `Lv. ${displayedLevel}`;
  }
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

function clearRepresentativeFormDraft() {
  const input = $('#playerNameInput');
  if (input) input.value = '';
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
    if (gameState.tutorialFlags.tutorialStep === 'setupPitcher') {
      gameState.tutorialFlags.tutorialStep = 'defenseTraining';
    }
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

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function createUnlockedPlayerCard({
  role,
  upgradeTarget = role,
  badge,
  image,
  name,
  position,
  level,
  statLabel,
  statValue,
  playerTarget = upgradeTarget,
}) {
  const levelUpCost = getLevelUpCost(level);

  return `
    <article class="player-management-card is-unlocked is-${role}" data-player-card="${playerTarget}" tabindex="0" role="button" aria-label="${escapeHtml(name)} 선수 메뉴 열기">
      <div class="player-card-portrait">
        <img src="${image}" alt="${escapeHtml(position)} 프로필" draggable="false" />
        <span>${badge}</span>
      </div>
      <div class="player-card-content">
        <div class="player-card-heading">
          <div>
            <p>${escapeHtml(position)}</p>
            <h2>${escapeHtml(name)}</h2>
          </div>
          <strong>Lv. ${level}</strong>
        </div>
        <div class="player-card-stat">
          <span>${statLabel}</span>
          <strong>${statValue}</strong>
        </div>
        <button class="player-upgrade-button" type="button" data-upgrade-player="${upgradeTarget}">
          레벨업 <span>${formatGold(levelUpCost)}</span>
        </button>
      </div>
    </article>
  `;
}

function createLockedPlayerCard(position) {
  return `
    <article class="player-management-card is-locked">
      <div class="player-card-portrait">
        <img src="${PLAYER_PROFILE_IMAGES.locked}" alt="미해금 선수" draggable="false" />
      </div>
      <div class="player-card-content">
        <div class="player-card-heading">
          <div>
            <p>${escapeHtml(POSITION_NAMES[position])}</p>
            <h2>미해금</h2>
          </div>
          <strong class="locked-label">LOCKED</strong>
        </div>
        <p class="locked-player-guide">선수를 영입하면 이름 설정과 육성이 가능합니다.</p>
        <button class="player-recruit-button" type="button" data-recruit-position="${position}">
          영입 <span>100G</span>
        </button>
      </div>
    </article>
  `;
}

function renderPlayersScreen() {
  const list = $('#playerManagementList');
  if (!list) return;

  const player = gameState.representativePlayer;
  const representativePosition = getSelectedPositionName() || '대표 타자';
  const availablePositions = PLAYER_POSITION_ORDER.filter(
    (position) => position !== player.position
  );
  const unlockedPositions = availablePositions.filter(
    (position) => gameState.fieldPlayers[position].unlocked
  );
  const lockedPositions = availablePositions.filter(
    (position) => !gameState.fieldPlayers[position].unlocked
  );

  const representativeCard = createUnlockedPlayerCard({
    role: 'batter',
    badge: '대표 타자',
    image: PLAYER_PROFILE_IMAGES.representative,
    name: player.name || '이름 입력',
    position: representativePosition,
    level: player.level,
    statLabel: '공격력',
    statValue: player.attack,
    playerTarget: 'batter',
  });

  const pitcherCard = createUnlockedPlayerCard({
    role: 'pitcher',
    badge: '1선발',
    image: PLAYER_PROFILE_IMAGES.pitcher,
    name: player.pitcherName || '이름 입력',
    position: '투수',
    level: player.pitcherLevel,
    statLabel: 'Hit 확률',
    statValue: formatPercent(getPitcherHitChance()),
    playerTarget: 'pitcher',
  });

  const recruitedCards = unlockedPositions.map((position) => {
    const recruitedPlayer = gameState.fieldPlayers[position];

    return createUnlockedPlayerCard({
      role: 'fielder',
      upgradeTarget: position,
      badge: '영입 선수',
      image: getPositionProfileImage(position),
      name: recruitedPlayer.name,
      position: POSITION_NAMES[position],
      level: recruitedPlayer.level,
      statLabel: '공격력',
      statValue: recruitedPlayer.attack,
      playerTarget: position,
    });
  }).join('');

  list.innerHTML =
    representativeCard +
    pitcherCard +
    recruitedCards +
    `<div class="locked-roster-title"><span>미해금 선수</span><strong>${lockedPositions.length}명</strong></div>` +
    lockedPositions.map(createLockedPlayerCard).join('');

  renderCommonStatus();
  renderSynergyScreen();
  renderTutorialGuidance();
}

function renderSynergyScreen() {
  const list = $('#synergyTeamList');
  if (!list) return;

  list.innerHTML = Object.keys(SYNERGY_CONFIG).map((teamKey) => {
    const state = getSynergyState(teamKey);
    const missingNames = state.members
      .filter((member) => !member.owned)
      .map((member) => SYNERGY_POSITION_INFO[member.position].name);
    const currentEffect = state.active
      ? `${state.effectName} +${getSynergyEffectValue(teamKey)}${state.effectUnit}`
      : '효과 미적용';
    const nextCondition = state.active
      ? `모든 팀원이 Lv. ${state.nextRequiredLevel} 이상`
      : `${missingNames.join(', ')} 영입 필요`;

    const membersHtml = state.members.map((member) => {
      const info = SYNERGY_POSITION_INFO[member.position];
      return `
        <div class="synergy-member ${member.owned ? 'is-owned' : 'is-missing'}">
          <div class="synergy-member-image">
            <img src="${info.image}" alt="${info.name}" draggable="false" />
            ${member.owned ? '' : '<span class="synergy-member-lock">LOCK</span>'}
          </div>
          <strong>${info.name}</strong>
          <span>${member.owned ? `Lv. ${member.level}` : '미영입'}</span>
        </div>
      `;
    }).join('');

    return `
      <article class="synergy-team-card is-${state.className} ${state.active ? 'is-active' : 'is-inactive'}">
        <header class="synergy-team-header">
          <div>
            <p>${state.subtitle}</p>
            <h3>${state.name}</h3>
          </div>
          <span class="synergy-state-badge">${state.active ? 'ACTIVE' : 'LOCKED'}</span>
        </header>
        <div class="synergy-team-body">
          <div class="synergy-member-grid synergy-member-grid--${state.members.length}">
            ${membersHtml}
          </div>
          <div class="synergy-team-info">
            <div class="synergy-step-box">
              <span>현재 단계</span>
              <strong>${state.step}<small>단계</small></strong>
            </div>
            <dl>
              <div><dt>적용 효과</dt><dd>${currentEffect}</dd></div>
              <div><dt>기준 선수</dt><dd>${state.active ? `팀 내 최저 Lv. ${state.minimumLevel}` : '팀 미완성'}</dd></div>
              <div><dt>다음 단계</dt><dd>${nextCondition}</dd></div>
            </dl>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function selectPlayersSection(sectionName) {
  const tutorialStep = gameState.tutorialFlags.tutorialStep;
  if (tutorialStep === 'openSynergyTab' && sectionName !== 'synergy') {
    showToast('지금은 시너지 탭을 선택해 주세요.');
    return;
  }
  if (
    ['upgradeBatter', 'upgradePitcher', 'returnToGame', 'recruitFirstBaseman'].includes(tutorialStep) &&
    sectionName !== 'management'
  ) {
    showToast('튜토리얼 진행 중에는 선수 관리 탭을 이용해 주세요.');
    return;
  }

  const isSynergy = sectionName === 'synergy';
  const managementTab = $('#playerManagementTab');
  const synergyTab = $('#synergyTab');

  managementTab?.classList.toggle('is-active', !isSynergy);
  managementTab?.setAttribute('aria-selected', String(!isSynergy));
  synergyTab?.classList.toggle('is-active', isSynergy);
  synergyTab?.setAttribute('aria-selected', String(isSynergy));
  $('#playerManagementPanel')?.classList.toggle('is-hidden', isSynergy);
  $('#synergyPanel')?.classList.toggle('is-hidden', !isSynergy);
  $('#playersScreen .players-scroll-area')?.scrollTo({ top: 0, behavior: 'smooth' });

  if (tutorialStep === 'openSynergyTab' && isSynergy) {
    setTutorialStep('tutorialCompletePending');
    $('#tutorialCompleteModal')?.classList.remove('is-hidden');
    playSynthesizedSfx('celebration');
  }
}

function completeBasicTutorial() {
  if (!gameState.tutorialFlags.tutorialCompletionRewardGranted) {
    changeGold(500);
    gameState.tutorialFlags.tutorialCompletionRewardGranted = true;
  }
  gameState.tutorialFlags.tutorialComplete = true;
  gameState.tutorialFlags.tutorialStep = 'completed';
  gameState.tutorialFlags.playerTabGuidanceActive = false;
  saveGameState();

  $('#tutorialCompleteModal')?.classList.add('is-hidden');
  setPlayerTabGuidance(false);
  renderNavigationLocks();
  renderTutorialGuidance();
  renderCommonStatus();
  showToast('튜토리얼 완료 보상 500G를 받았습니다!');
}

function getPositionProfileImage(position) {
  if (position === 'catcher') return PLAYER_PROFILE_IMAGES.catcher;
  if (['first', 'second', 'third', 'shortstop'].includes(position)) {
    return PLAYER_PROFILE_IMAGES.infielder;
  }
  return PLAYER_PROFILE_IMAGES.outfielder;
}

function getPlayerActionData(target) {
  const representative = gameState.representativePlayer;

  if (target === 'batter') {
    return {
      target,
      name: representative.name,
      position: representative.position,
      positionName: getSelectedPositionName(),
      image: PLAYER_PROFILE_IMAGES.representative,
      isRepresentative: true,
      canBeRepresentative: false,
    };
  }

  if (target === 'pitcher') {
    return {
      target,
      name: representative.pitcherName,
      position: 'pitcher',
      positionName: '투수',
      image: PLAYER_PROFILE_IMAGES.pitcher,
      isRepresentative: false,
      canBeRepresentative: false,
    };
  }

  const player = gameState.fieldPlayers[target];
  if (!POSITION_NAMES[target] || !player?.unlocked) return null;

  return {
    target,
    name: player.name,
    position: target,
    positionName: POSITION_NAMES[target],
    image: getPositionProfileImage(target),
    isRepresentative: false,
    canBeRepresentative: true,
  };
}

function openPlayerActionModal(target) {
  if (
    ['upgradeBatter', 'upgradePitcher', 'returnToGame', 'recruitFirstBaseman', 'openSynergyTab']
      .includes(gameState.tutorialFlags.tutorialStep)
  ) {
    showToast('튜토리얼이 안내하는 버튼을 선택해 주세요.');
    return;
  }

  const data = getPlayerActionData(target);
  if (!data) return;

  selectedPlayerTarget = target;
  const image = $('#playerActionImage');
  if (image) {
    image.src = data.image;
    image.alt = `${data.positionName} 프로필`;
  }
  if ($('#playerActionPosition')) $('#playerActionPosition').textContent = data.positionName;
  if ($('#playerActionTitle')) $('#playerActionTitle').textContent = data.name || '이름 입력';
  $('#playerActionRepresentativeBadge')?.classList.toggle('is-hidden', !data.isRepresentative);
  $('#openRepresentativeConfirmButton')?.classList.toggle('is-hidden', !data.canBeRepresentative);
  $('#playerActionModal')?.classList.remove('is-hidden');
}

function hidePlayerActionModals() {
  $('#playerActionModal')?.classList.add('is-hidden');
  $('#renamePlayerModal')?.classList.add('is-hidden');
  $('#representativeConfirmModal')?.classList.add('is-hidden');
}

function openRenamePlayerModal() {
  const data = getPlayerActionData(selectedPlayerTarget);
  if (!data) return;

  const input = $('#renamePlayerInput');
  if ($('#renamePlayerTitle')) $('#renamePlayerTitle').textContent = `${data.positionName} 이름 변경`;
  if (input) input.value = data.name;
  $('#playerActionModal')?.classList.add('is-hidden');
  $('#renamePlayerModal')?.classList.remove('is-hidden');
  window.setTimeout(() => input?.focus(), 80);
}

function confirmRenamePlayer() {
  const input = $('#renamePlayerInput');
  const name = input?.value.trim() ?? '';
  const target = selectedPlayerTarget;

  if (!name) {
    showToast('변경할 이름을 입력해 주세요.');
    input?.focus();
    return;
  }

  if (target === 'batter') {
    gameState.representativePlayer.name = name;
  } else if (target === 'pitcher') {
    gameState.representativePlayer.pitcherName = name;
  } else if (gameState.fieldPlayers[target]?.unlocked) {
    gameState.fieldPlayers[target].name = name;
  } else {
    return;
  }

  saveGameState();
  hidePlayerActionModals();
  renderPlayersScreen();
  showToast('선수 이름이 변경되었습니다.');
}

function openRepresentativeConfirmation() {
  const data = getPlayerActionData(selectedPlayerTarget);
  if (!data?.canBeRepresentative) return;

  if ($('#representativeCandidateName')) {
    $('#representativeCandidateName').textContent = `${data.positionName} ${data.name}`;
  }
  $('#playerActionModal')?.classList.add('is-hidden');
  $('#representativeConfirmModal')?.classList.remove('is-hidden');
}

function confirmRepresentativeChange() {
  const newPosition = selectedPlayerTarget;
  const candidate = gameState.fieldPlayers[newPosition];
  const representative = gameState.representativePlayer;
  const oldPosition = representative.position;

  if (!candidate?.unlocked || !POSITION_NAMES[newPosition] || !POSITION_NAMES[oldPosition]) {
    hidePlayerActionModals();
    return;
  }

  if (gameState.gold < 1000) {
    showToast('대표 타자 변경에는 1,000G가 필요합니다.');
    return;
  }

  gameState.gold -= 1000;
  gameState.fieldPlayers[oldPosition] = {
    unlocked: true,
    name: representative.name,
    level: representative.level,
    attack: representative.attack,
  };
  representative.position = newPosition;
  representative.name = candidate.name;
  representative.level = candidate.level;
  representative.attack = candidate.attack;
  gameState.fieldPlayers[newPosition] = {
    unlocked: false,
    name: '',
    level: 1,
    attack: 10,
  };

  saveGameState();
  hidePlayerActionModals();
  renderPlayersScreen();
  renderAttackScreen();
  showToast(`${representative.name} 선수가 대표 타자로 지정되었습니다.`);
}

function upgradePlayer(target) {
  const tutorialStep = gameState.tutorialFlags.tutorialStep;
  if (tutorialStep === 'upgradeBatter' && target !== 'batter') {
    showToast('지금은 대표 타자만 강화할 수 있습니다.');
    return;
  }
  if (tutorialStep === 'upgradePitcher' && target !== 'pitcher') {
    showToast('지금은 대표 투수만 강화할 수 있습니다.');
    return;
  }
  if (['returnToGame', 'recruitFirstBaseman', 'openSynergyTab'].includes(tutorialStep)) {
    showToast('튜토리얼이 안내하는 버튼을 선택해 주세요.');
    return;
  }

  const player = gameState.representativePlayer;
  const recruitedPlayer = gameState.fieldPlayers[target];
  const currentLevel =
    target === 'pitcher'
      ? player.pitcherLevel
      : target === 'batter'
        ? player.level
        : recruitedPlayer?.level;

  if (!currentLevel) return;

  const cost =
    (tutorialStep === 'upgradeBatter' && target === 'batter') ||
    (tutorialStep === 'upgradePitcher' && target === 'pitcher')
      ? 50
      : getLevelUpCost(currentLevel);

  if (gameState.gold < cost) {
    showToast(`골드가 부족합니다. 레벨업에는 ${formatGold(cost)}가 필요합니다.`);
    return;
  }

  gameState.gold -= cost;

  if (target === 'pitcher') {
    player.pitcherLevel += 1;
  } else if (target === 'batter') {
    player.level += 1;
    player.attack = player.level * 10;
  } else if (recruitedPlayer?.unlocked) {
    recruitedPlayer.level += 1;
    recruitedPlayer.attack = recruitedPlayer.level * 10;
  }

  saveGameState();
  renderPlayersScreen();

  if (tutorialStep === 'upgradeBatter' && target === 'batter') {
    setTutorialStep('upgradePitcher');
    showToast('공격력이 올랐습니다! 이제 대표 투수를 강화하세요.');
  } else if (tutorialStep === 'upgradePitcher' && target === 'pitcher') {
    setTutorialStep('returnToGame');
    showToast('Hit 확률이 올랐습니다! 경기로 돌아가세요.');
  } else {
    showToast('레벨업이 완료되었습니다!');
  }
}

function hideRecruitModals() {
  $('#recruitConfirmModal')?.classList.add('is-hidden');
  $('#recruitSetupModal')?.classList.add('is-hidden');
}

function openRecruitConfirmation(position) {
  if (
    gameState.tutorialFlags.tutorialStep === 'recruitFirstBaseman' &&
    position !== 'first'
  ) {
    showToast('지금은 1루수만 영입할 수 있습니다.');
    return;
  }

  if (!POSITION_NAMES[position] || gameState.fieldPlayers[position]?.unlocked) {
    return;
  }

  selectedRecruitPosition = position;
  const positionName = POSITION_NAMES[position];
  const title = $('#recruitConfirmTitle');
  const positionLabel = $('#recruitConfirmPosition');

  if (title) title.textContent = `${positionName} 영입`;
  if (positionLabel) positionLabel.textContent = positionName;
  $('#recruitConfirmModal')?.classList.remove('is-hidden');
}

function cancelRecruitment() {
  selectedRecruitPosition = '';
  hideRecruitModals();
}

function openRecruitSetup() {
  const position = selectedRecruitPosition;
  if (!POSITION_NAMES[position]) return;

  if (gameState.gold < 100) {
    showToast('선수 영입에는 100G가 필요합니다.');
    return;
  }

  $('#recruitConfirmModal')?.classList.add('is-hidden');

  const positionName = POSITION_NAMES[position];
  const profileImage = $('#recruitProfileImage');
  const nameInput = $('#recruitPlayerNameInput');

  if ($('#recruitSetupTitle')) {
    $('#recruitSetupTitle').textContent = `${positionName} 이름 설정`;
  }
  if ($('#recruitFixedPosition')) $('#recruitFixedPosition').textContent = positionName;
  if ($('#recruitProfilePosition')) $('#recruitProfilePosition').textContent = positionName;
  if ($('#recruitProfileName')) $('#recruitProfileName').textContent = '이름 입력';
  if (profileImage) {
    profileImage.src = getPositionProfileImage(position);
    profileImage.alt = `${positionName} 프로필`;
  }
  if (nameInput) {
    nameInput.value = '';
    nameInput.setAttribute('aria-label', `${positionName} 이름 입력`);
  }

  $('#recruitSetupModal')?.classList.remove('is-hidden');
  window.setTimeout(() => nameInput?.focus(), 80);
}

function updateRecruitPreview() {
  const name = $('#recruitPlayerNameInput')?.value.trim();
  const previewName = $('#recruitProfileName');
  if (previewName) previewName.textContent = name || '이름 입력';
}

function completePlayerRecruitment() {
  const position = selectedRecruitPosition;
  const recruitedPlayer = gameState.fieldPlayers[position];
  const nameInput = $('#recruitPlayerNameInput');
  const name = nameInput?.value.trim() ?? '';

  if (!POSITION_NAMES[position] || !recruitedPlayer || recruitedPlayer.unlocked) {
    hideRecruitModals();
    return;
  }

  if (!name) {
    showToast('영입할 선수의 이름을 입력해 주세요.');
    nameInput?.focus();
    return;
  }

  if (gameState.gold < 100) {
    showToast('선수 영입에는 100G가 필요합니다.');
    return;
  }

  gameState.gold -= 100;
  recruitedPlayer.unlocked = true;
  recruitedPlayer.name = name;
  recruitedPlayer.level = 1;
  recruitedPlayer.attack = 10;
  saveGameState();

  selectedRecruitPosition = '';
  hideRecruitModals();
  renderPlayersScreen();
  if (
    gameState.tutorialFlags.tutorialStep === 'recruitFirstBaseman' &&
    position === 'first'
  ) {
    gameState.tutorialFlags.firstBasemanRecruitedForSynergy = true;
    setTutorialStep('openSynergyTab');
    showToast('1루수 영입 완료! 이제 시너지 탭을 확인하세요.');
  } else {
    showToast(`${POSITION_NAMES[position]} 영입이 완료되었습니다!`);
  }
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
    applyBattleStagePresentation();
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
    monsterNameDisplay.innerHTML = config.isBoss
      ? `<span class="boss-name">${config.monsterName}</span>`
      : `${config.monsterName} <span class="monster-level">Lv . ${config.monsterLevel}</span>`;
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
    applyBattleStagePresentation();
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
  battleBatter.classList.toggle('is-wide-swing-frame', frameIndex === 2);
}

function setMonsterImage(state) {
  const battleMonster = $('#battleMonster');
  if (!battleMonster) return;

  const config = getAttackConfigForStage(gameState.currentStage);
  battleMonster.src = config.isBoss
    ? BOSS_MONSTER_IMAGES[state] ?? BOSS_MONSTER_IMAGES.normal
    : MONSTER_IMAGES[state] ?? MONSTER_IMAGES.normal;
  battleMonster.classList.toggle('is-boss', Boolean(config.isBoss));
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

function hideBattleResultPopup() {
  const damagePopup = $('#damagePopup');
  if (!damagePopup) return;

  damagePopup.className = 'damage-popup';
  damagePopup.innerHTML = '';
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
  changeGold(amount);
  saveGameState();
  renderCommonStatus();
}

function completeDefensePitchTutorialStep() {
  if (gameState.tutorialFlags.tutorialStep !== 'defenseTraining') return;
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
  gameState.tutorialFlags.tutorialStep = 'defenseSupport';
  changeGold(100);
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
    playSynthesizedSfx('hit');
    addDefenseGold(rewards.hit);
    showDefenseResult('Hit!', `+${rewards.hit}G`, 'hit');

    if (isFirstTutorialPitch) {
      gameState.tutorialFlags.firstDefenseHitDone = true;
      saveGameState();
    }
    completeDefensePitchTutorialStep();
    return;
  }

  const isCatch = Math.random() < getFielderCatchChance();

  if (isCatch) {
    setMonsterImage('crying');
    playSynthesizedSfx('catch');
    addDefenseGold(rewards.catch);
    showDefenseResult('Catch!', `+${rewards.catch}G`, 'catch');
    completeDefensePitchTutorialStep();
    return;
  }

  setMonsterImage('proud');
  playSynthesizedSfx('monster-hit');
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
    playFileSfx('pitch');
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
  hideBattleResultPopup();
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

  const criticalChance = getAttackCriticalChance();
  const isCritical = Math.random() < criticalChance;
  const baseDamage = gameState.representativePlayer.attack;
  const damage = isCritical ? baseDamage * 2 : baseDamage;

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
    playFileSfx('swing');
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
  hideBattleResultPopup();
  hideAllModals();
  showScreen('attack');
  renderAttackScreen();

  attackState.isRunning = true;

  attackTimerId = window.setInterval(() => {
    if (!attackState.isRunning || attackState.isCleared) return;

    attackState.timeLeft -= 1;
    renderAttackScreen();

    if (attackState.timeLeft >= 1 && attackState.timeLeft <= 5) {
      const warningTime = attackState.timeLeft;
      if (attackTimerBeepFrameId) {
        window.cancelAnimationFrame(attackTimerBeepFrameId);
      }
      attackTimerBeepFrameId = window.requestAnimationFrame(() => {
        attackTimerBeepFrameId = null;
        if (!attackState.isRunning || attackState.timeLeft !== warningTime) return;
        playAttackTimerBeep(warningTime);
      });
    }

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
  hidePlayerActionModals();
  $('#resetConfirmModal')?.classList.add('is-hidden');
  $('#modeSwitchModal')?.classList.add('is-hidden');
  $('#synergyIntroModal')?.classList.add('is-hidden');
  $('#betaCompleteModal')?.classList.add('is-hidden');
  $('#goldCapModal')?.classList.add('is-hidden');
  if (gameState.tutorialFlags.tutorialComplete) {
    $('#tutorialCompleteModal')?.classList.add('is-hidden');
  }
}

function showStageClearModal() {
  stopAttackTutorial();
  setBatterFrame(0);
  setMonsterImage('hit');

  const config = getAttackConfigForStage(gameState.currentStage);
  if (gameState.currentStage === 1) gameState.tutorialFlags.stage1Cleared = true;
  if (gameState.currentStage === 2) gameState.tutorialFlags.stage2Cleared = true;
  saveGameState();

  if ($('#stageClearTitle')) {
    $('#stageClearTitle').textContent = `${gameState.currentStage}스테이지 클리어!`;
  }
  if ($('#stageClearMonsterName')) {
    $('#stageClearMonsterName').textContent = getStageMonsterDisplayName(config);
  }

  const reward = getStageClearReward(gameState.currentStage);
  const rewardElement = $('#stageClearReward');
  if (rewardElement) {
    rewardElement.classList.toggle('is-hidden', reward <= 0);
    rewardElement.innerHTML = reward > 0
      ? `클리어 보상 <strong>${formatGold(reward)}</strong>`
      : '';
  }

  if (reward > 0 && !gameState.claimedStageRewards[gameState.currentStage]) {
    changeGold(reward);
    gameState.claimedStageRewards[gameState.currentStage] = true;
    saveGameState();
    renderCommonStatus();
  }

  $('#stageClearModal')?.classList.remove('is-hidden');
  playSynthesizedSfx('celebration');
}

function hideStageClearModal() {
  $('#stageClearModal')?.classList.add('is-hidden');
}

function showStageFailModal() {
  const stageFailModal = $('#stageFailModal');
  if (!stageFailModal) return;

  const config = getAttackConfigForStage(gameState.currentStage);
  const description = $('#stageFailDescription');
  if (description) {
    description.innerHTML =
      `${getStageMonsterDisplayName(config)}를 제한 시간 내에 처치하지 못했어요.<br />` +
      '수비 모드에서 골드를 벌어 선수를 강화해 보세요!';
  }
  stageFailModal.classList.remove('is-hidden');
  playSynthesizedSfx('failure');
}

function hideStageFailModal() {
  $('#stageFailModal')?.classList.add('is-hidden');
}

function switchToDefenseMode() {
  hideStageFailModal();

  if (gameState.tutorialFlags.tutorialComplete) {
    startDefenseMode();
    return;
  }

  stopAttackTutorial();
  stopDefenseMode();
  window.clearTimeout(defenseSupportModalTimerId);
  hideDefenseSupportModal();
  setDefenseSupportPending(false);
  setPlayerTabGuidance(false);

  gameState.currentMode = 'defense';
  gameState.tutorialFlags.representativePitcherSet = false;
  gameState.tutorialFlags.firstDefenseHitDone = false;
  gameState.tutorialFlags.firstDefensePitchCount = 0;
  gameState.tutorialFlags.defenseSupportGranted = false;
  gameState.tutorialFlags.playerTabGuidanceActive = false;
  gameState.tutorialFlags.tutorialStep = 'setupPitcher';
  saveGameState();
  clearRepresentativeFormDraft();
  showScreen('representative');
  showToast('대표 투수 설정 화면으로 이동합니다.');
}

function confirmStageClear() {
  hideStageClearModal();
  if (gameState.currentStage === 1) {
    gameState.currentStage = 2;
    gameState.currentMode = 'attack';
    saveGameState();
    renderCommonStatus();
    startAttackTutorial();
    return;
  }

  if (gameState.currentStage === 2) {
    gameState.currentStage = 3;
    gameState.currentMode = 'attack';
    gameState.tutorialFlags.tutorialStep = 'synergyIntro';
    saveGameState();
    attackState = createAttackState();
    showScreen('attack');
    renderAttackScreen();
    $('#synergyIntroModal')?.classList.remove('is-hidden');
    return;
  }

  if (gameState.currentStage < 10) {
    gameState.currentStage += 1;
    saveGameState();
    startAttackTutorial();
    return;
  }

  hideStageClearModal();
  stopAttackTutorial();
  $('#betaCompleteModal')?.classList.remove('is-hidden');
}

function finishBetaAndStartDefense() {
  $('#betaCompleteModal')?.classList.add('is-hidden');
  gameState.currentMode = 'defense';
  saveGameState();
  startDefenseMode();
  showToast('베타 스테이지 완료! 수비 모드에서 선수들을 계속 육성할 수 있습니다.');
}

function openModeSwitchConfirmation() {
  const step = gameState.tutorialFlags.tutorialStep;
  if (!gameState.tutorialFlags.tutorialComplete && step !== 'switchToAttack') {
    showToast('아직은 튜토리얼 안내에 따라 모드를 전환할 수 있습니다.');
    return;
  }

  const targetMode = gameState.currentMode === 'defense' ? 'attack' : 'defense';
  const targetName = targetMode === 'attack' ? '공격' : '수비';
  const title = $('#modeSwitchTitle');
  const description = $('#modeSwitchDescription');
  const modal = $('#modeSwitchModal');

  if (title) title.textContent = `${targetName} 모드로 전환`;
  if (description) description.textContent = `${targetName} 모드로 전환할까요?`;
  if (modal) {
    modal.dataset.targetMode = targetMode;
    modal.classList.remove('is-hidden');
  }
}

function confirmModeSwitch() {
  const modal = $('#modeSwitchModal');
  const targetMode = modal?.dataset.targetMode;
  if (!['attack', 'defense'].includes(targetMode)) return;

  modal.classList.add('is-hidden');
  gameState.currentMode = targetMode;

  if (gameState.tutorialFlags.tutorialStep === 'switchToAttack' && targetMode === 'attack') {
    gameState.tutorialFlags.tutorialStep = 'stage2Retry';
    saveGameState();
    startAttackTutorial();
    return;
  }

  saveGameState();
  if (targetMode === 'attack') startAttackTutorial();
  else startDefenseMode();
}

function beginSynergyPlayerGuidance() {
  $('#synergyIntroModal')?.classList.add('is-hidden');
  if (!gameState.tutorialFlags.synergySupportGranted) {
    changeGold(100);
    gameState.tutorialFlags.synergySupportGranted = true;
  }
  gameState.tutorialFlags.tutorialStep = 'openPlayersForSynergy';
  gameState.tutorialFlags.playerTabGuidanceActive = true;
  saveGameState();
  renderCommonStatus();
  setPlayerTabGuidance(true);
  showToast('지원금 100G 지급! 선수 탭을 선택하세요.');
}

function initStartScreen() {
  $('#startButton')?.addEventListener('click', handleGameStart);

  $('#settingsButton')?.addEventListener('click', () => {
    renderQuickSettings();
    $('#quickSettingsModal')?.classList.remove('is-hidden');
  });

  $('#closeQuickSettingsButton')?.addEventListener('click', hideQuickSettings);
  $('#quickVolumeSlider')?.addEventListener('input', (event) => {
    updateBgmVolume('main', event.target.value);
  });
  $('#quickMuteToggleButton')?.addEventListener('click', toggleMute);
}

function handleBottomNavigation(button) {
  const target = button.dataset.target;
  const currentScreenId = button.closest('section')?.id;

  if (target === 'settings') {
    if (currentScreenId === 'settingsScreen') {
      showToast('현재 설정 화면입니다.');
      return;
    }

    settingsReturnScreen =
      currentScreenId === 'playersScreen'
        ? 'players'
        : currentScreenId === 'representativeScreen'
          ? 'representative'
          : currentScreenId === 'attackScreen'
            ? 'attack'
            : 'start';
    showScreen('settings');
    return;
  }

  if (gameState.tutorialFlags.playerTabGuidanceActive) {
    if (target === 'players') {
      gameState.tutorialFlags.playerTabGuidanceActive = false;
      gameState.tutorialFlags.tutorialStep =
        gameState.tutorialFlags.tutorialStep === 'openPlayersForSynergy'
          ? 'recruitFirstBaseman'
          : 'upgradeBatter';
      saveGameState();
      setPlayerTabGuidance(false);
      showScreen('players');
      return;
    }

    showToast('지금은 선수 탭만 선택할 수 있습니다.');
    return;
  }

  const tutorialStep = gameState.tutorialFlags.tutorialStep;

  if (tutorialStep === 'returnToGame') {
    if (target !== 'game') {
      showToast('지금은 경기 탭으로 돌아가 주세요.');
      return;
    }
    gameState.currentMode = 'defense';
    setTutorialStep('switchToAttack');
    stopAttackTutorial();
    stopDefenseMode();
    showScreen('attack');
    renderDefenseScreen();
    return;
  }

  if (target === 'shop' && !isShopUnlocked()) {
    showToast('상점은 튜토리얼 완료 후 이용할 수 있습니다.');
    return;
  }

  // Keep every tutorial step on its intended path, including setup screens and result modals.
  if (isTutorialInProgress()) {
    if (target === 'players' && tutorialStep === 'openPlayersForSynergy') {
      gameState.tutorialFlags.playerTabGuidanceActive = false;
      setPlayerTabGuidance(false);
      setTutorialStep('recruitFirstBaseman');
      showScreen('players');
      return;
    }
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
    if (currentScreenId === 'playersScreen') {
      showToast('현재 선수 관리 화면입니다.');
      return;
    }

    showScreen('players');
    return;
  }

  if (target === 'dungeon') {
    showToast('던전은 아직 잠겨 있습니다.');
    return;
  }

  const targetPageMap = {
    shop: PAGE_CONFIG.shopPage,
  };

  const fallbackMap = {
    shop: '상점 화면은 다음 단계에서 연결할 예정입니다.',
  };

  moveToPage(targetPageMap[target], fallbackMap[target] ?? '해당 화면은 다음 단계에서 연결할 예정입니다.');
}

function initRepresentativeScreen() {
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
  $('#attackScreen [data-mode-switch]')?.addEventListener('click', openModeSwitchConfirmation);
  $('#confirmModeSwitchButton')?.addEventListener('click', confirmModeSwitch);
  $('#cancelModeSwitchButton')?.addEventListener('click', () => {
    $('#modeSwitchModal')?.classList.add('is-hidden');
  });
  $('#synergyIntroConfirmButton')?.addEventListener('click', beginSynergyPlayerGuidance);
  $('#betaCompleteConfirmButton')?.addEventListener('click', finishBetaAndStartDefense);
  $('#goldCapConfirmButton')?.addEventListener('click', () => {
    $('#goldCapModal')?.classList.add('is-hidden');
  });
  $$('.defense-rule-item').forEach((button) => {
    button.addEventListener('click', () => {
      showDefenseRuleTooltip(button);
    });
  });
}

function getBgmVolume(trackKey) {
  if (gameState.settings.muted) return 0;
  const volume = getStoredBgmVolume(trackKey);
  return (volume / 100) * 0.65;
}

function getDesiredBgmKey() {
  const isStartScreen = !$('#startScreen')?.classList.contains('is-hidden');
  if (isStartScreen) return 'main';
  return gameState.currentMode === 'defense' ? 'defense' : 'attack';
}

function syncBgmVolume() {
  if (!bgmTracks) return;
  Object.entries(bgmTracks).forEach(([key, audio]) => {
    audio.volume = getBgmVolume(key);
  });
}

async function startBackgroundMusic() {
  if (!bgmTracks || !hasBgmInteraction) return;

  const desiredKey = getDesiredBgmKey();
  const desiredTrack = bgmTracks[desiredKey];
  if (!desiredTrack) return;

  syncBgmVolume();

  Object.entries(bgmTracks).forEach(([key, audio]) => {
    if (key !== desiredKey) audio.pause();
  });

  if (activeBgmKey !== desiredKey) {
    desiredTrack.currentTime = 0;
    activeBgmKey = desiredKey;
  }

  if (desiredTrack.paused) {
    await desiredTrack.play();
  }
}

function syncBackgroundMusic() {
  startBackgroundMusic().catch(() => {});
}

function initBackgroundMusic() {
  bgmTracks = Object.fromEntries(
    Object.entries(BGM_SOURCES).map(([key, source]) => {
      const audio = new Audio(source);
      audio.loop = true;
      audio.preload = 'auto';
      return [key, audio];
    })
  );
  sfxTracks = Object.fromEntries(
    Object.entries(SFX_SOURCES).map(([key, source]) => {
      const audio = new Audio(source);
      audio.preload = 'auto';
      return [key, audio];
    })
  );
  syncBgmVolume();

  const unlock = () => {
    hasBgmInteraction = true;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass && !timerAudioContext) {
      timerAudioContext = new AudioContextClass();
    }
    syncBackgroundMusic();
  };
  document.addEventListener('pointerdown', unlock, { once: true });
  document.addEventListener('keydown', unlock, { once: true });
}

function renderSettingsScreen() {
  const muted = Boolean(gameState.settings.muted);

  Object.keys(BGM_SOURCES).forEach((key) => {
    const volume = getStoredBgmVolume(key);
    const slider = $(`#${key}VolumeSlider`);
    const value = $(`#${key}VolumeValue`);
    if (slider) slider.value = String(volume);
    if (value) value.textContent = muted ? '음소거' : `${volume}%`;
  });
  const sfxVolume = getStoredSfxVolume();
  if ($('#sfxVolumeSlider')) $('#sfxVolumeSlider').value = String(sfxVolume);
  if ($('#sfxVolumeValue')) {
    $('#sfxVolumeValue').textContent = muted ? '음소거' : `${sfxVolume}%`;
  }
  if ($('#muteIcon')) $('#muteIcon').textContent = muted ? '🔇' : '🔊';
  if ($('#muteLabel')) $('#muteLabel').textContent = muted ? '음소거 해제' : '음소거';
  renderQuickSettings();
  renderCommonStatus();
}

function renderQuickSettings() {
  const volume = getStoredBgmVolume('main');
  const muted = Boolean(gameState.settings.muted);
  const slider = $('#quickVolumeSlider');

  if (slider) slider.value = String(volume);
  if ($('#quickVolumeValue')) $('#quickVolumeValue').textContent = muted ? '음소거' : `${volume}%`;
  if ($('#quickMuteIcon')) $('#quickMuteIcon').textContent = muted ? '🔇' : '🔊';
  if ($('#quickMuteLabel')) $('#quickMuteLabel').textContent = muted ? '음소거 해제' : '음소거';
}

function hideQuickSettings() {
  $('#quickSettingsModal')?.classList.add('is-hidden');
}

function getStoredBgmVolume(trackKey) {
  return Math.max(
    0,
    Math.min(100, Math.floor(normalizeNumber(gameState.settings.bgmVolumes?.[trackKey], 20)))
  );
}

function updateBgmVolume(trackKey, value) {
  if (!Object.hasOwn(BGM_SOURCES, trackKey)) return;
  const volume = Math.max(0, Math.min(100, Math.floor(normalizeNumber(value, 20))));
  gameState.settings.bgmVolumes ??= {};
  gameState.settings.bgmVolumes[trackKey] = volume;
  if (volume > 0) gameState.settings.muted = false;
  saveGameState();
  startBackgroundMusic().catch(() => {});
  syncBgmVolume();
  renderSettingsScreen();
}

function updateSfxVolume(value) {
  const volume = Math.max(0, Math.min(100, Math.floor(normalizeNumber(value, 70))));
  gameState.settings.sfxVolume = volume;
  if (volume > 0) gameState.settings.muted = false;
  saveGameState();
  renderSettingsScreen();
}

function toggleMute() {
  gameState.settings.muted = !gameState.settings.muted;
  saveGameState();
  startBackgroundMusic().catch(() => {});
  syncBgmVolume();
  renderSettingsScreen();
  showToast(gameState.settings.muted ? '게임 소리가 음소거되었습니다.' : '게임 소리가 켜졌습니다.');
}

function resetGameProgress() {
  stopAttackTutorial();
  stopDefenseMode();
  window.clearTimeout(defenseSupportModalTimerId);
  setDefenseSupportPending(false);
  setPlayerTabGuidance(false);
  selectedRecruitPosition = '';
  selectedPlayerTarget = '';
  gameState = cloneDefaultState();
  attackState = createAttackState();
  defenseState = { isRunning: false };
  saveGameState();
  clearRepresentativeFormDraft();
  if ($('#recruitPlayerNameInput')) $('#recruitPlayerNameInput').value = '';
  if ($('#renamePlayerInput')) $('#renamePlayerInput').value = '';
  hideRecruitModals();
  hidePlayerActionModals();
  $('#resetConfirmModal')?.classList.add('is-hidden');
  selectPlayersSection('management');
  renderRepresentativeScreen();
  renderAttackScreen();
  renderPlayersScreen();
  renderSettingsScreen();
  showScreen('start');
  showToast('게임이 초기화되었습니다. 처음부터 시작해 주세요.');
}

function initSettingsScreen() {
  Object.keys(BGM_SOURCES).forEach((key) => {
    $(`#${key}VolumeSlider`)?.addEventListener('input', (event) => {
      updateBgmVolume(key, event.target.value);
    });
  });
  $('#sfxVolumeSlider')?.addEventListener('input', (event) => {
    updateSfxVolume(event.target.value);
  });
  $('#muteToggleButton')?.addEventListener('click', toggleMute);
  $('#resetGameButton')?.addEventListener('click', () => {
    $('#resetConfirmModal')?.classList.remove('is-hidden');
  });
  $('#confirmResetButton')?.addEventListener('click', resetGameProgress);
  $('#cancelResetButton')?.addEventListener('click', () => {
    $('#resetConfirmModal')?.classList.add('is-hidden');
  });
}

function initPlayersScreen() {
  $$('.players-section-tab').forEach((button) => {
    button.addEventListener('click', () => selectPlayersSection(button.dataset.playerSection));
  });

  $('#playerManagementList')?.addEventListener('click', (event) => {
    const upgradeButton = event.target.closest('[data-upgrade-player]');
    if (upgradeButton) {
      upgradePlayer(upgradeButton.dataset.upgradePlayer);
      return;
    }

    const recruitButton = event.target.closest('[data-recruit-position]');
    if (recruitButton) {
      openRecruitConfirmation(recruitButton.dataset.recruitPosition);
      return;
    }

    const playerCard = event.target.closest('[data-player-card]');
    if (playerCard) {
      openPlayerActionModal(playerCard.dataset.playerCard);
    }
  });

  $('#playerManagementList')?.addEventListener('keydown', (event) => {
    if (!['Enter', ' '].includes(event.key)) return;
    const playerCard = event.target.closest('[data-player-card]');
    if (!playerCard || event.target.closest('button')) return;
    event.preventDefault();
    openPlayerActionModal(playerCard.dataset.playerCard);
  });

  $('#recruitConfirmYesButton')?.addEventListener('click', openRecruitSetup);
  $('#recruitConfirmNoButton')?.addEventListener('click', cancelRecruitment);
  $('#recruitPlayerNameInput')?.addEventListener('input', updateRecruitPreview);
  $('#recruitPlayerNameInput')?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      completePlayerRecruitment();
    }
  });
  $('#recruitPlayerSetupButton')?.addEventListener('click', completePlayerRecruitment);
  $('#closePlayerActionButton')?.addEventListener('click', hidePlayerActionModals);
  $('#openRenamePlayerButton')?.addEventListener('click', openRenamePlayerModal);
  $('#openRepresentativeConfirmButton')?.addEventListener('click', openRepresentativeConfirmation);
  $('#confirmRenamePlayerButton')?.addEventListener('click', confirmRenamePlayer);
  $('#cancelRenamePlayerButton')?.addEventListener('click', () => {
    $('#renamePlayerModal')?.classList.add('is-hidden');
    $('#playerActionModal')?.classList.remove('is-hidden');
  });
  $('#renamePlayerInput')?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') confirmRenamePlayer();
  });
  $('#confirmRepresentativeButton')?.addEventListener('click', confirmRepresentativeChange);
  $('#cancelRepresentativeButton')?.addEventListener('click', () => {
    $('#representativeConfirmModal')?.classList.add('is-hidden');
    $('#playerActionModal')?.classList.remove('is-hidden');
  });
  $('#tutorialCompleteConfirmButton')?.addEventListener('click', completeBasicTutorial);
}

function initBottomNavigation() {
  $$('.bottom-nav-button').forEach((button) => {
    button.addEventListener('click', () => handleBottomNavigation(button));
  });
  renderNavigationLocks();
}

function initUiSoundEffects() {
  document.addEventListener(
    'click',
    (event) => {
      const button = event.target.closest('button');
      if (!button || button.disabled) return;
      playSynthesizedSfx('click');
    },
    true
  );
}

function initGame() {
  initBackgroundMusic();
  initUiSoundEffects();
  initStatusInfoTooltips();
  initStartScreen();
  initRepresentativeScreen();
  initAttackScreen();
  initPlayersScreen();
  initSettingsScreen();
  initBottomNavigation();
  showScreen('start');
}

window.BaseballMonsterHunter = {
  getState() {
    return JSON.parse(JSON.stringify(gameState));
  },
  setGold(value) {
    setGoldAmount(value);
    saveGameState();
    renderRepresentativeScreen();
    renderAttackScreen();
    renderPlayersScreen();
  },
  addGold(amount) {
    changeGold(amount);
    saveGameState();
    renderRepresentativeScreen();
    renderAttackScreen();
    renderPlayersScreen();
  },
  resetSave() {
    resetGameProgress();
  },
};

initGame();
