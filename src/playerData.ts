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
}

const latestSaveRevision = 7;
let player: PlayerData = {
  saveRevision: latestSaveRevision,
  username: '',
  systemSetup: false,
  path: '/',
  accountTier: 0,
  curCaptcha: '',
  curCaptchaTier: -1,
  curCaptchaAnswer: '',
  captchaSolves: [0],
  captchaSolveStrikes: [0],
  libraryAskedQuestions: [],
  serverLatencyMs: 1000,
};

export function loadGame() {
  if (!('CapOS' in localStorage)) {
    return;
  }

  player = JSON.parse(localStorage.getItem('CapOS')!);

  if (player.saveRevision < 1) {
    player.path = '/';
  }

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

  player.saveRevision = latestSaveRevision;
}

export function saveGame() {
  localStorage.setItem('CapOS', JSON.stringify(player));
}

export {player};
