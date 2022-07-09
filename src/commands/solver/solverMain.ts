import {addCommand, Command} from '../../cmd';
import {term} from '../../term';
import {printCompany} from '../../misc/termHelper';
import {version} from '../../misc/constant';
import {solverTierCmd} from './tier';
import {player} from '../../playerData';
import {solverIntroCmd} from './intro';
import {
  highestCaptchaTier,
  printCurrentCaptcha,
  requestNewCaptcha,
  solveCaptcha,
} from './captcha';
import {solverLibraryCmd} from './library';
import {solverMirrorSelectorCmd} from './mirrorSelector';

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
        if (player.curCaptcha !== '') {
          term.writeln('Displaying pending task on local...');
          printCurrentCaptcha();
          return 0;
        }

        let tier = highestCaptchaTier();
        if (argc >= 3) {
          tier = parseInt(argv[2]);
          if (isNaN(tier) || tier < 0 || tier > highestCaptchaTier()) {
            term.writeln(
              `Invalid tier! Available tiers are 0~${highestCaptchaTier()}`
            );
            return -1;
          }
        }

        return await requestNewCaptcha(tier);
      } else if (argv[1] === 'submit') {
        if (player.curCaptcha === '') {
          term.writeln("Error: You haven't fetched any captcha yet!");
          return -1;
        }

        if (argc < 3) {
          term.writeln('Error: You need to provide the answer!');
          return -1;
        }

        return await solveCaptcha(argv[2]);
      }
    }

    if (player.accountTier >= 2) {
      if (argv[1] === 'library') {
        return await solverLibraryCmd();
      }
    }

    if (
      player.libraryAskedQuestions.includes(2) &&
      argv[1] === 'autoTheSolverMirrorSelectorBeta'
    ) {
      return await solverMirrorSelectorCmd();
    }
  }

  term.writeln(solverDesc);
  term.writeln('Usage:');
  term.writeln(`${argv[0]} tier: Display info about your account tier`);
  if (player.accountTier > 0) {
    term.writeln(`${argv[0]} intro: Display the introduction`);
    term.writeln(`${argv[0]} fetch (tier): Fetch captcha from server or local`);
    term.writeln(
      `${argv[0]} submit (answer): Submit answer to the current captcha`
    );
  }

  if (player.accountTier > 1) {
    term.writeln(`${argv[0]} library: Access ${printCompany()} library`);
  }
  term.writeln('');
  return 0;
}

export function setupSolverCommand() {
  addCommand(
    new Command({
      name: 'solver',
      desc: solverDesc,
      isUnlocked: () => true,
      cmdHandler: solverCmdHandler,
    })
  );
}
