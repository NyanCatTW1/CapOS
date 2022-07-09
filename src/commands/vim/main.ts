import {addCommand, Command} from '../../cmd';
import {term} from '../../term';
import {player} from '../../playerData';

async function vimCmdHandler(argc: number, argv: string[]): Promise<number> {
  if (argc < 2) {
    term.writeln('usage: vim filename');
    return -1;
  }

  if (false) {
    term.writeln('TODO: Write script lol');
  } else {
    term.writeln(`You don't know how to write ${argv[1]} yet.`);
  }

  return 0;
}

export function setupVimCommand() {
  addCommand(
    new Command({
      name: 'vim',
      desc: 'VIM - Vi IMproved',
      isUnlocked: () => player.libraryAskedQuestions.includes(5),
      cmdHandler: vimCmdHandler,
    })
  );
}
