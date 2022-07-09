import {setupAutoT0} from './autoT0';

export class PyScript {
  name: string;
  desc: string;
  isUnlocked: () => boolean;
  isRunnable: () => boolean;
  writeSteps: [
    {
      name: string;
      failMsg: string;
      isUnlocked: () => boolean;
      canWrite: () => boolean;
    }
  ];
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
    writeSteps: [
      {
        name: string;
        failMsg: string;
        isUnlocked: () => boolean;
        canWrite: () => boolean;
      }
    ];
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

export function setupScripts() {
  setupAutoT0();
  return;
}
