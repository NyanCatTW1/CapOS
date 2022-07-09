import {addCommand, Command} from '../cmd';
import {term} from '../term';
import {player} from '../playerData';
import {PyScript, scripts} from '../scripts/scriptMain';

async function pythonCmdHandler(argc: number, argv: string[]): Promise<number> {
  if (argc < 2) {
    term.writeln('usage: python filename.py');
    return -1;
  }

  const curScript = scripts[argv[1]];
  if (
    curScript instanceof PyScript &&
    player.scriptStepsWrote[argv[1]].length !== 0
  ) {
    if (curScript.isRunnable()) {
      return await curScript.onRun(argc - 1, argv.slice(1));
    } else {
      term.writeln('');
      term.writeln(
        'Tip: The script failed to run because it is not complete yet.'
      );
    }
  } else {
    term.writeln(
      `python: can't open file '/home/${player.username}/${argv[1]}': [Errno 2] No such file or directory`
    );
  }

  return -1;
}

export function setupPythonCommand() {
  addCommand(
    new Command({
      name: 'python',
      desc: 'The Python Interpreter',
      isUnlocked: () => player.libraryAskedQuestions.includes(4),
      cmdHandler: pythonCmdHandler,
    })
  );
}
