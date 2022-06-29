// https://bobbyhadz.com/blog/typescript-property-does-not-exist-on-type-window
export interface PlayerData {
  world: string;
}

declare let player: PlayerData;
player.world = 'world';

export function hello(who: string = player.world): string {
  return `Hello ${who}! `;
}

window.alert(hello());
