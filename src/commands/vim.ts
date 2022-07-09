import {addCommand, Command} from '../cmd';
import {term} from '../term';
import {player} from '../playerData';
import {scripts, PyScript, canTryWriteScript} from '../scripts/scriptMain';
import {c, printCompany, rotatingLoadingBar} from '../misc/termHelper';

function printWritableScripts() {
  const scriptNames = Object.keys(scripts);
  let printHeader = true;
  for (let i = 0; i < scriptNames.length; i += 1) {
    const curScript = scripts[scriptNames[i]];
    if (canTryWriteScript(curScript)) {
      if (printHeader) {
        term.writeln('Scripts to work on:');
        printHeader = false;
      }
      term.writeln(`${curScript.name}: ${curScript.desc}`);
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
    if (!canTryWriteScript(curScript)) {
      term.writeln(
        'Tip: You currently have no ideas on how to improve the script.'
      );
      return 0;
    }

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
          if (argv[1] === 'autoT0.py' && i === 0) {
            term.writeln(
              `Tip: Learn what you don't know in ${printCompany()} library.`
            );
          }
        }

        if (!player.scriptStepsTried[argv[1]].includes(i)) {
          player.scriptStepsTried[argv[1]].push(i);
        }
      }
    }

    if (curScript.isRunnable()) {
      term.writeln('Tip: You can now run the script with the python command.');
    }
    return 0;
  } else {
    term.writeln(`Tip: You don't know how to write ${argv[1]} yet.`);
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
