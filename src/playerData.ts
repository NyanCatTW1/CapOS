export interface PlayerData {
  saveRevision: number;
}

declare let player: PlayerData;
player.saveRevision = 0;

export {player};
