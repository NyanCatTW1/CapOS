import {addCommand, Command} from '../../cmd';
import {term} from '../../term';
import {player} from '../../playerData';

async function pythonCmdHandler(argc: number, argv: string[]): Promise<number> {
  if (argc < 2) {
    term.writeln('usage: python filename.py');
    return -1;
  }

  if (player.scriptsWrote.includes(argv[1])) {
    term.writeln('TODO: Run script lol');
  } else {
    term.writeln(
      `python: can't open file '/home/${player.username}/${argv[1]}': [Errno 2] No such file or directory`
    );
  }

  return 0;
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
