const GAME_CONFIG = {
  initialGold: 0,

  // 다음 페이지를 만들면 아래 값만 실제 파일명으로 바꾸면 됩니다.
  // 예: representative.html, settings.html
  nextStartPage: null,
  nextSettingsPage: null,
};

const $ = (selector) => document.querySelector(selector);

const goldText = $('#goldText');
const startButton = $('#startButton');
const settingsButton = $('#settingsButton');
const toast = $('#toast');

const gameState = {
  gold: GAME_CONFIG.initialGold,
};

let toastTimer = null;

function formatGold(value) {
  return `${Number(value).toLocaleString('ko-KR')}G`;
}

function normalizeGold(value) {
  const parsedValue = Number(value);

  if (!Number.isFinite(parsedValue)) {
    return 0;
  }

  return Math.max(0, Math.floor(parsedValue));
}

function updateGoldDisplay() {
  if (!goldText) return;

  const formattedGold = formatGold(gameState.gold);
  goldText.textContent = formattedGold;

  goldText.classList.toggle('is-long', formattedGold.length >= 7);
  goldText.classList.toggle('is-very-long', formattedGold.length >= 10);
}

function setGold(value) {
  gameState.gold = normalizeGold(value);
  updateGoldDisplay();
}

function addGold(amount) {
  setGold(gameState.gold + normalizeGold(amount));
}

function spendGold(amount) {
  const cost = normalizeGold(amount);

  if (gameState.gold < cost) {
    return false;
  }

  setGold(gameState.gold - cost);
  return true;
}

function getGold() {
  return gameState.gold;
}

function showToast(message) {
  if (!toast) return;

  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('is-visible');

  toastTimer = window.setTimeout(() => {
    toast.classList.remove('is-visible');
  }, 1300);
}

function moveToPage(pageUrl, fallbackMessage) {
  if (pageUrl) {
    window.location.href = pageUrl;
    return;
  }

  showToast(fallbackMessage);
}

function handleGameStart() {
  moveToPage(
    GAME_CONFIG.nextStartPage,
    '다음 단계에서 대표 타자 설정 화면으로 연결할 예정입니다.'
  );
}

function handleSettingsOpen() {
  moveToPage(
    GAME_CONFIG.nextSettingsPage,
    '설정 화면은 다음 단계에서 연결할 예정입니다.'
  );
}

function initStartScreen() {
  setGold(GAME_CONFIG.initialGold);

  startButton?.addEventListener('click', handleGameStart);
  settingsButton?.addEventListener('click', handleSettingsOpen);
}

window.GameStartScreen = {
  setGold,
  addGold,
  spendGold,
  getGold,
};

initStartScreen();
