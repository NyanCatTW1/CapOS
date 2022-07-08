import {sleep} from '../../misc/asyncHelper';
import {printCompany, printUsername} from '../../misc/termHelper';
import {player} from '../../playerData';
import {lineInput, term} from '../../term';
import {solverTierUp} from './main';

export async function solverIntroCmd(
  argc: number,
  argv: string[]
): Promise<number> {
  term.writeln(
    `Hello, ${printUsername()}! Let's not waste your time here and get straight to the point.`
  );
  term.writeln(
    `To fetch a new captcha with highest tier, run '${argv[0]} fetch'. You can also run '${argv[0]} fetch (tier)' if you wish to fetch an easier one.`
  );
  term.writeln(
    `In case you forgot the captcha later, rerun '${argv[0]} fetch' to display it.`
  );
  term.writeln(
    `After finding the solution, run '${argv[0]} submit (answer)' to submit the answer.`
  );
  term.writeln(
    'If the answer is valid, you will get your rewards. In case you got it wrong though...you might get punished depending on the captcha tier.'
  );
  term.writeln('');
  term.writeln("That's about it for now. Why not go ahead and give it a try?");

  if (player.accountTier < 1) {
    await lineInput('Press enter to complete the intro.');
    term.write(`Marking intro as complete on ${printCompany()}`);
    for (let i = 0; i < 5; i++) {
      await sleep(1000);
      term.write('.');
    }
    term.writeln(' Success!');
    solverTierUp(1);
  }
  return 0;
}
