import {addCommand, Command} from '../../cmd';
import {term} from '../../term';
import {printCompany} from '../../misc/termHelper';
import {version} from '../../misc/constant';
import {solverTierCmd} from './tier';
import {player} from '../../playerData';
import {solverIntroCmd} from './intro';

export function solverTierUp(targetTier: number) {
  if (player.accountTier >= targetTier) return;
  player.accountTier = targetTier;

  term.writeln(`Congratulations, you are now tier ${player.accountTier}!`);

  switch (player.accountTier) {
    case 1:
      term.writeln("Subroutine 'fetch', 'submit' unlocked in command 'solver'");
  }
}

const solverDesc = `${printCompany()} Command Line Interface, ver ${version}`;
async function solverCmdHandler(argc: number, argv: string[]): Promise<number> {
  if (argc !== 1) {
    if (argv[1] === 'tier') {
      return solverTierCmd(argc, argv);
    } else if (argv[1] === 'intro') {
      return await solverIntroCmd(argc, argv);
    }

    if (player.accountTier >= 1) {
      if (argv[1] === 'fetch') {
        term.writeln('TODO');
        return 0;
      } else if (argv[1] === 'submit') {
        term.writeln('TODO');
        return 0;
      }
    }
  }

  term.writeln(solverDesc);
  term.writeln('Usage:');
  term.writeln(`${argv[0]} tier: Displays info about your account tier`);
  if (player.accountTier > 0) {
    term.writeln(`${argv[0]} intro: Displays the introduction`);
    term.writeln(
      `${argv[0]} fetch (tier): Fetches captcha from server or local`
    );
    term.writeln(
      `${argv[0]} submit (answer): Submits answer to the current captcha`
    );
  }
  term.writeln('');
  return 0;
}

export function setupSolverCommand() {
  addCommand(
    new Command({
      name: 'solver',
      desc: solverDesc,
      cmdHandler: solverCmdHandler,
    })
  );
}
