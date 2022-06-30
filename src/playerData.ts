export interface PlayerData {
  saveRevision: Number;
}

declare let player: PlayerData;
player.saveRevision = 0;

export {player};
