import {player} from '../playerData';
import {term} from '../term';
import {addScript, PyScript} from './scriptMain';

const name = 'autoT0.py';
export function setupAutoT0() {
  if (!(name in player.scriptStepsWrote)) {
    player.scriptStepsWrote[name] = [];
  }

  if (!(name in player.scriptStepsTried)) {
    player.scriptStepsTried[name] = [];
  }

  addScript(
    new PyScript({
      name: name,
      desc: 'Solves T0 captchas automatically',
      isUnlocked: () => true,
      isRunnable: () => false,
      writeSteps: [
        {
          name: 'Import theSolvers module...',
          failMsg: 'Umm...how I do I do that again?',
          isUnlocked: () => true,
          canWrite: () => false,
        },
      ],
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onRun: async (_argc: number, _argv: string[]) => {
        term.writeln('TODO: autoT0.py onRun lol');
        return 0;
      },
    })
  );
}
