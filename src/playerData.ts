export interface PlayerData {
  saveRevision: number;
  username: string;
  systemSetup: boolean;
  path: string;
  accountTier: number;
  curCaptcha: string;
  curCaptchaTier: number;
  curCaptchaAnswer: string;
  captchaSolves: number[];
  captchaSolveStrikes: number[];
  libraryAskedQuestions: number[];
  serverLatencyMs: number;
  scriptsWrote?: string[];
  scriptStepsWrote: {[key: string]: number[]};
  scriptStepsTried: {[key: string]: number[]};
  cmdHistory: string[];
}

const latestSaveRevision = 14;
let player: PlayerData = {
  saveRevision: latestSaveRevision,
  username: '',
  systemSetup: false,
  path: '~',
  accountTier: 0,
  curCaptcha: '',
  curCaptchaTier: -1,
  curCaptchaAnswer: '',
  captchaSolves: [0],
  captchaSolveStrikes: [0],
  libraryAskedQuestions: [],
  serverLatencyMs: 1000,
  scriptStepsWrote: {},
  scriptStepsTried: {},
  cmdHistory: [],
};

export function loadGame() {
  if (!('CapOS' in localStorage)) {
    return;
  }

  player = JSON.parse(localStorage.getItem('CapOS')!);

  if (player.saveRevision < 2) {
    player.accountTier = 0;
  }

  if (player.saveRevision < 3) {
    player.curCaptcha = '';
  }

  if (player.saveRevision < 4) {
    player.captchaSolves = [0];
  }

  if (player.saveRevision < 5) {
    player.libraryAskedQuestions = [];
  }

  if (player.saveRevision < 6) {
    player.serverLatencyMs = 1000;
  }

  if (player.saveRevision < 7) {
    player.captchaSolveStrikes = [0];
  }

  if (player.saveRevision < 8) {
    player.path = '~';
  }

  if (player.saveRevision === 9) {
    delete player.scriptsWrote;
  }

  if (player.saveRevision < 12) {
    player.scriptStepsWrote = {};
  }

  if (player.saveRevision < 13) {
    player.scriptStepsTried = {};
  }

  if (player.saveRevision < 14) {
    player.cmdHistory = [];
  }

  player.saveRevision = latestSaveRevision;
}

export function saveGame() {
  localStorage.setItem('CapOS', JSON.stringify(player));
}

export {player};
