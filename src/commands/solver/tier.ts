import {player} from '../../playerData';
import {term} from '../../term';

export function solverTierCmd(argc: number, argv: string[]): number {
  term.writeln(`Current account tier: ${player.accountTier}`);
  term.writeln(
    'Higher tier unlocks access to harder captchas and advanced features throughout the system.'
  );

  term.write(`In order to reach tier ${player.accountTier + 1}, `);
  switch (player.accountTier) {
    case 0:
      term.writeln(`read the introduction by running '${argv[0]} intro'`);
      break;
    case 1:
      term.writeln('solve 5 T0 captchas');
  }

  return 0;
}
