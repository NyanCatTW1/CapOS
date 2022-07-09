import {addCommand, Command} from '../cmd';
import {c} from '../misc/termHelper';
import {player} from '../playerData';
import {PyScript, scripts} from '../scripts/scriptMain';
import {term} from '../term';

export function setupCatCommand() {
  addCommand(
    new Command({
      name: 'cat',
      desc: "Display a file's content...sometimes",
      isUnlocked: () => true,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      cmdHandler: async (argc: number, argv: string[]) => {
        if (argc < 2) {
          term.writeln('cat: File name required');
          return -1;
        }

        const curScript = scripts[argv[1]];
        if (
          curScript instanceof PyScript &&
          player.scriptStepsWrote[argv[1]].length !== 0
        ) {
          term.writeln(
            `cat: Refusing to print ${c.bold(
              'MAGICS'
            )}(Me Avoiding Getting Into Complicated Stuff) content to terminal`
          );
        } else {
          term.writeln(`cat: ${argv[1]}: No such file or directory`);
        }

        return 0;
      },
    })
  );
}
