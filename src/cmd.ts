import {term, lineInput} from './term';
import {printUsername, c} from './misc/termHelper';
import {player} from './playerData';
import {setupHelpCommand} from './commands/help';

// I really hope there is a way to make this DRYer...
// https://github.com/Microsoft/TypeScript/issues/5326
export class Command {
  name: string;
  desc: string;
  cmdHandler: (argc: number, argv: string[]) => number;

  constructor({
    name,
    desc,
    cmdHandler,
  }: {
    name: string;
    desc: string;
    cmdHandler: (argc: number, argv: string[]) => number;
  }) {
    this.name = name;
    this.desc = desc;
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

  for (;;) {
    const cmd = await lineInput(getPS());
    const argv = cmd.split(' ');
    const argc = argv.length;
    const cmdName = argv[0];
    if (cmdName === '') {
      // No command fed
      continue;
    }

    if (cmds[cmdName] instanceof Command) {
      cmds[cmdName].cmdHandler(argc, argv);
    } else {
      term.writeln('csh: command not found: ' + cmdName);
    }
  }
}