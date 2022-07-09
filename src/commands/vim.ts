import {addCommand, Command} from '../cmd';
import {term} from '../term';
import {player} from '../playerData';
import {scripts, PyScript} from '../scripts/scriptMain';
import {c, rotatingLoadingBar} from '../misc/termHelper';

function printWritableScripts() {
  const scriptNames = Object.keys(scripts);
  let printHeader = true;
  for (let i = 0; i < scriptNames.length; i += 1) {
    const curScript = scripts[scriptNames[i]];
    if (curScript.isUnlocked()) {
      for (let k = 0; k < curScript.writeSteps.length; k += 1) {
        if (
          curScript.writeSteps[k].isUnlocked() &&
          !player.scriptStepsWrote[scriptNames[i]].includes(k)
        ) {
          if (printHeader) {
            term.writeln('Scripts to work on:');
            printHeader = false;
          }
          term.writeln(`${scriptNames[i]}: ${curScript.desc}`);
        }
      }
    }
  }
}

async function vimCmdHandler(argc: number, argv: string[]): Promise<number> {
  if (argc < 2) {
    term.writeln('usage: vim filename');
    printWritableScripts();
    return -1;
  }

  const curScript = scripts[argv[1]];
  if (curScript instanceof PyScript && curScript.isUnlocked()) {
    const steps = curScript.writeSteps;
    let failSlowdown = 1;
    for (let i = 0; i < steps.length; i += 1) {
      if (
        !player.scriptStepsWrote[argv[1]].includes(i) &&
        steps[i].isUnlocked()
      ) {
        const canWrite = steps[i].canWrite();
        if (
          !(await rotatingLoadingBar({
            desc: steps[i].name,
            intervalMs: 500 * failSlowdown,
            doneMsg: canWrite ? c.green('Success!') : c.red(steps[i].failMsg),
            interruptible: true,
          }))
        ) {
          break;
        }

        if (canWrite) {
          player.scriptStepsWrote[argv[1]].push(i);
        } else {
          failSlowdown *= 2;
        }

        if (!player.scriptStepsTried[argv[1]].includes(i)) {
          player.scriptStepsTried[argv[1]].push(i);
        }
      }
    }
    return 0;
  } else {
    term.writeln(`You don't know how to write ${argv[1]} yet.`);
  }

  printWritableScripts();
  return 0;
}

export function setupVimCommand() {
  addCommand(
    new Command({
      name: 'vim',
      desc: 'VIM - Vi IMproved',
      isUnlocked: () => player.libraryAskedQuestions.includes(5),
      cmdHandler: vimCmdHandler,
    })
  );
}
