export interface PlayerData {
  saveRevision: number;
  username: string;
  systemSetup: boolean;
  path: string;
  accountTier: number;
}

const latestSaveRevision = 2;
let player: PlayerData = {
  saveRevision: latestSaveRevision,
  username: '',
  systemSetup: false,
  path: '/',
  accountTier: 0,
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

  player.saveRevision = latestSaveRevision;
}

export function saveGame() {
  localStorage.setItem('CapOS', JSON.stringify(player));
}

export {player};
