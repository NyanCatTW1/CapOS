import {player} from '../playerData';
import {setupAutoT0} from './autoT0';

export class PyScript {
  name: string;
  desc: string;
  isUnlocked: () => boolean;
  isRunnable: () => boolean;
  writeSteps: {
    name: string;
    failMsg?: string;
    isUnlocked: () => boolean;
    canWrite: () => boolean;
  }[];
  onRun: (argc: number, argv: string[]) => Promise<number>;

  constructor({
    name,
    desc,
    isUnlocked,
    isRunnable,
    writeSteps,
    onRun,
  }: {
    name: string;
    desc: string;
    isUnlocked: () => boolean;
    isRunnable: () => boolean;
    writeSteps: {
      name: string;
      failMsg?: string;
      isUnlocked: () => boolean;
      canWrite: () => boolean;
    }[];
    onRun: (argc: number, argv: string[]) => Promise<number>;
  }) {
    this.name = name;
    this.desc = desc;
    this.isUnlocked = isUnlocked;
    this.isRunnable = isRunnable;
    this.writeSteps = writeSteps;
    this.onRun = onRun;
  }
}

export const scripts: {[key: string]: PyScript} = {};

export function addScript(script: PyScript) {
  scripts[script.name] = script;
}

export function canTryWriteScript(script: PyScript): boolean {
  if (script.isUnlocked()) {
    for (let k = 0; k < script.writeSteps.length; k += 1) {
      if (
        script.writeSteps[k].isUnlocked() &&
        !player.scriptStepsWrote[script.name].includes(k)
      ) {
        return true;
      }
    }
  }

  return false;
}

export function setupScripts() {
  setupAutoT0();
  return;
}
