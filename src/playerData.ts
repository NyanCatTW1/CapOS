export interface PlayerData {
  saveRevision: number;
  username?: string;
  systemSetup: boolean;
}

let player: PlayerData = {
  saveRevision: 0,
  systemSetup: false,
};

export function loadGame() {
  player = JSON.parse(localStorage.getItem('CapOS')!);
}

export function saveGame() {
  localStorage.setItem('CapOS', JSON.stringify(player));
}

export {player};
