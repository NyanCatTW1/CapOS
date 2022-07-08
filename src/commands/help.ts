import {addCommand, Command, cmds} from '../cmd';
import {term} from '../term';

export function setupHelpCommand() {
  addCommand(
    new Command({
      name: 'help',
      desc: 'Lists all commands and their purposes',
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      cmdHandler: async (_argc: number, _argv: string[]) => {
        Object.keys(cmds).forEach(cmdName => {
          term.writeln(`${cmdName}: ${cmds[cmdName].desc}`);
        });

        return 0;
      },
    })
  );
}
