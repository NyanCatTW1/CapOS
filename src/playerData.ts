export interface PlayerData {
  saveRevision: number;
  username?: string;
  systemSetup: boolean;
  path: string;
}

const latestSaveRevision = 1;
let player: PlayerData = {
  saveRevision: latestSaveRevision,
  systemSetup: false,
  path: '/',
};

export function loadGame() {
  player = JSON.parse(localStorage.getItem('CapOS')!);

  if (player.saveRevision < 1) {
    player.path = '/';
  }

  player.saveRevision = latestSaveRevision;
}

export function saveGame() {
  localStorage.setItem('CapOS', JSON.stringify(player));
}

export {player};
