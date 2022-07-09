export function randint(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randomString(len: number, charset: string): string {
  let ret = '';
  for (let i = 0; i < len; i++) {
    ret += charset[randint(0, charset.length - 1)];
  }

  return ret;
}
