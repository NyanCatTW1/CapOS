import {term, lineInput} from './term';
import {printUsername, c} from './misc/termHelper';
import {player} from './playerData';
import {setupHelpCommand} from './commands/help';
import {setupSolverCommand} from './commands/solver/solverMain';
import {setupPythonCommand} from './commands/python';
import {setupVimCommand} from './commands/vim';
import {setupLsCommand} from './commands/ls';
import {setupCatCommand} from './commands/cat';

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

export let cmdHistoryPtr = -1;

export function moveCmdHistoryPtr(delta: number): boolean {
  const oldPtr = cmdHistoryPtr;
  cmdHistoryPtr = Math.min(
    Math.max(0, cmdHistoryPtr + delta),
    player.cmdHistory.length
  );

  return oldPtr !== cmdHistoryPtr;
}

export function getCurCmdHistory(): string {
  if (cmdHistoryPtr >= player.cmdHistory.length) return '';
  return player.cmdHistory[cmdHistoryPtr];
}

export async function runCommandHandler() {
  setupHelpCommand();
  setupLsCommand();
  setupCatCommand();
  setupSolverCommand();
  setupPythonCommand();
  setupVimCommand();

  for (;;) {
    cmdHistoryPtr = player.cmdHistory.length;
    const cmd = await lineInput(getPS());
    cmdHistoryPtr = -1;

    // https://stackoverflow.com/a/1981366
    const argv = cmd.trim().replace(/  +/g, ' ').split(' ');
    const argc = argv.length;
    const cmdName = argv[0];
    if (cmdName === '') {
      // No command fed
      continue;
    }

    player.cmdHistory.push(cmd);
    while (player.cmdHistory.length > 1000) {
      player.cmdHistory.shift();
    }

    if (cmds[cmdName] instanceof Command && cmds[cmdName].isUnlocked()) {
      await cmds[cmdName].cmdHandler(argc, argv);
    } else {
      term.writeln('csh: command not found: ' + cmdName);
    }
  }
}
