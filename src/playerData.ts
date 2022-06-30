export interface PlayerData {
  saveRevision: number;
  username?: string;
  systemSetup: boolean;
}

const player: PlayerData = {
  saveRevision: 0,
  systemSetup: false,
};

export {player};
