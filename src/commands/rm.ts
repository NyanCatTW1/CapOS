import {addCommand, Command} from '../cmd';
import {dotLoadingBar} from '../misc/termHelper';
import {lineInput, term} from '../term';

export function setupRmCommand() {
  addCommand(
    new Command({
      name: 'rm',
      desc: 'Allows you to delete your system/account and restart from scratch',
      isUnlocked: () => true,
      cmdHandler: async (argc: number, argv: string[]) => {
        if (!argv.includes('-rf') || !argv.includes('/')) {
          term.writeln("rm: To delete the entire system, run 'rm -rf /'");
          return -1;
        }

        if (!argv.includes('--no-preserve-root')) {
          term.writeln("rm: it is dangerous to operate recursively on '/'");
          term.writeln('rm: use --no-preserve-root to override this failsafe');
          return -1;
        }

        if (
          !(
            (await lineInput("rm: remove directory '/'? ")).toLowerCase()[0] ===
            'y'
          )
        ) {
          return -1;
        }

        term.writeln('Tip: This is indeed a hard reset with no way to revert!');

        if (
          !(await dotLoadingBar({
            desc: "rm: Deleting '/' after 15 seconds (Ctrl+C to abort)",
            dots: 15,
            intervalMs: 1000,
            interruptible: true,
          }))
        ) {
          return -1;
        }

        term.writeln('Bravo Six, going dark.');
        localStorage.removeItem('CapOS');
        location.reload();
        return 0;
      },
    })
  );
}
