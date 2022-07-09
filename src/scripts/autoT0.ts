import {requestNewCaptcha, solveCaptcha} from '../commands/solver/captcha';
import {dotLoadingBar} from '../misc/termHelper';
import {player} from '../playerData';
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
      isRunnable: () => player.scriptStepsWrote[name].includes(7),
      writeSteps: [
        {
          // 0
          name: 'Import theSolvers module...',
          failMsg: 'Umm...how I do I do that again?',
          isUnlocked: () => true,
          canWrite: () => player.libraryAskedQuestions.includes(6),
        },
        {
          // 1
          name: 'Fetch T0 task with theSolvers...',
          isUnlocked: () => player.scriptStepsWrote[name].includes(0),
          canWrite: () => true,
        },
        {
          // 2
          name: 'Split the captcha by space to get the equation...',
          isUnlocked: () => player.scriptStepsWrote[name].includes(1),
          canWrite: () => true,
        },
        {
          // 3
          name: 'Split the equation by + to get both numbers...',
          isUnlocked: () => player.scriptStepsWrote[name].includes(2),
          canWrite: () => true,
        },
        {
          // 4
          name: 'Convert both numbers into integers...',
          isUnlocked: () => player.scriptStepsWrote[name].includes(3),
          canWrite: () => true,
        },
        {
          // 5
          name: 'Add the numbers together...',
          isUnlocked: () => player.scriptStepsWrote[name].includes(4),
          canWrite: () => true,
        },
        {
          // 6
          name: 'Convert the sum back to string...',
          isUnlocked: () => player.scriptStepsWrote[name].includes(5),
          canWrite: () => true,
        },
        {
          // 7
          name: 'Submit the answer with theSolvers...',
          isUnlocked: () => player.scriptStepsWrote[name].includes(6),
          canWrite: () => true,
        },
        {
          // 8
          name: 'Make the script repeat itself...',
          failMsg: 'How do I do that without copypasting the code?',
          isUnlocked: () =>
            player.scriptStepsWrote[name].includes(7) &&
            player.captchaSolves[0] >= 10,
          canWrite: () => player.libraryAskedQuestions.includes(7),
        },
      ],
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onRun: async (_argc: number, _argv: string[]) => {
        for (;;) {
          if ((await requestNewCaptcha(0, true)) !== 0) return -1;
          if (
            !(await dotLoadingBar({
              desc: 'Solving T0 captcha (5 steps)',
              dots: 5,
              intervalMs: 100,
              interruptible: true,
            }))
          )
            return -1;
          await solveCaptcha(player.curCaptchaAnswer);
          if (!player.scriptStepsWrote[name].includes(8)) return 0;
        }
      },
    })
  );
}
