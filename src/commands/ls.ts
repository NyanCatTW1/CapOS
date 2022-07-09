import {addCommand, Command} from '../cmd';
import {player} from '../playerData';
import {term} from '../term';

export function setupLsCommand() {
  addCommand(
    new Command({
      name: 'ls',
      desc: 'List all files in current directory',
      isUnlocked: () => true,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      cmdHandler: async (_argc: number, _argv: string[]) => {
        const files = [];
        const scriptNames = Object.keys(player.scriptStepsWrote);
        for (let i = 0; i < scriptNames.length; i += 1) {
          if (player.scriptStepsWrote[scriptNames[i]].length !== 0) {
            files.push(scriptNames[i]);
          }
        }

        term.writeln(files.join(' '));
        return 0;
      },
    })
  );
}
