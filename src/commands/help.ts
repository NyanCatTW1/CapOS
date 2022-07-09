import {addCommand, Command, cmds} from '../cmd';
import {term} from '../term';

export function setupHelpCommand() {
  addCommand(
    new Command({
      name: 'help',
      desc: 'List all commands and their purposes',
      isUnlocked: () => true,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      cmdHandler: async (_argc: number, _argv: string[]) => {
        Object.keys(cmds).forEach(cmdName => {
          if (cmds[cmdName].isUnlocked()) {
            term.writeln(`${cmdName}: ${cmds[cmdName].desc}`);
          }
        });

        return 0;
      },
    })
  );
}
