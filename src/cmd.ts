import {term, lineInput} from './term';
import {printUsername, c} from './misc/termHelper';
import {player} from './playerData';
import {setupHelpCommand} from './commands/help';
import {setupSolverCommand} from './commands/solver/main';
import {setupPythonCommand} from './commands/python/main';
import {setupVimCommand} from './commands/vim/main';

// I really hope there is a way to make this DRYer...
// https://github.com/Microsoft/TypeScript/issues/5326
export class Command {
  name: string;
  desc: string;
  isUnlocked: () => boolean;
  cmdHandler: (argc: number, argv: string[]) => Promise<number>;

  constructor({
    name,
    desc,
    isUnlocked,
    cmdHandler,
  }: {
    name: string;
    desc: string;
    isUnlocked: () => boolean;
    cmdHandler: (argc: number, argv: string[]) => Promise<number>;
  }) {
    this.name = name;
    this.desc = desc;
    this.isUnlocked = isUnlocked;
    this.cmdHandler = cmdHandler;
  }
}

export const cmds: {[key: string]: Command} = {};

export function addCommand(cmd: Command) {
  cmds[cmd.name] = cmd;
}

function getPS() {
  return (
    printUsername() +
    c.green('@capos') +
    ' ' +
    c.blue(player.path) +
    c.blue(' $ ')
  );
}

export async function runCommandHandler() {
  setupHelpCommand();
  setupSolverCommand();
  setupPythonCommand();
  setupVimCommand();

  for (;;) {
    const cmd = await lineInput(getPS());
    // https://stackoverflow.com/a/1981366
    const argv = cmd.trim().replace(/  +/g, ' ').split(' ');
    const argc = argv.length;
    const cmdName = argv[0];
    if (cmdName === '') {
      // No command fed
      continue;
    }

    if (cmds[cmdName] instanceof Command && cmds[cmdName].isUnlocked()) {
      await cmds[cmdName].cmdHandler(argc, argv);
    } else {
      term.writeln('csh: command not found: ' + cmdName);
    }
  }
}
