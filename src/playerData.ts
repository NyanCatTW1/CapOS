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
  libraryAskedQuestions: number[];
}

const latestSaveRevision = 5;
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
  libraryAskedQuestions: [],
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

  player.saveRevision = latestSaveRevision;
}

export function saveGame() {
  localStorage.setItem('CapOS', JSON.stringify(player));
}

export {player};
