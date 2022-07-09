import {c} from '../../misc/termHelper';
import {player} from '../../playerData';
import {term} from '../../term';

const tierNames = [
  'Total newbie',
  'Newbie',
  'Student',
  'Novice Scripter',
  'Experienced Scripter',
];

export function printTier(tier: number): string {
  return c.bold(`Tier ${tier} (${tierNames[tier]})`);
}

export function solverTierUp(targetTier: number) {
  if (player.accountTier >= targetTier) return;
  player.accountTier = targetTier;

  term.writeln(
    `Congratulations, you are now ${printTier(player.accountTier)}!`
  );

  switch (player.accountTier) {
    case 1:
      term.writeln("Subroutine 'fetch', 'submit' unlocked in command 'solver'");
      break;
    case 2:
      term.writeln("Subroutine 'library' unlocked in command 'solver'");
  }

  printNextTierReq();
}

export function printNextTierReq() {
  term.write(`In order to reach ${printTier(player.accountTier + 1)}, `);
  switch (player.accountTier) {
    case 0:
      term.writeln("read the introduction by running 'solver intro'");
      break;
    case 1:
      term.writeln('solve 5 T0 captchas');
      break;
    case 2:
      term.writeln('solve 100 T0 captchas');
      break;
    case 3:
      term.writeln('urge Nyan cat to create new content');
      break;
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function solverTierCmd(_argc: number, _argv: string[]): number {
  term.writeln(`You are currently ${printTier(player.accountTier)}`);
  term.writeln(
    'Higher Tier unlocks access to harder captchas and advanced features throughout the system.'
  );

  printNextTierReq();
  return 0;
}
