import {player} from '../playerData';
import {interruptFlag, setInterruptFlag, term} from '../term';
import {sleep} from './asyncHelper';
import {companyName, osName} from './constant';

const c = require('ansi-colors');
// Need to enable it manually for some reason
c.enabled = true;

export function isAlphanumeric(char: string) {
  const code = char.charCodeAt(0);
  return (
    (48 <= code && code <= 57) ||
    (65 <= code && code <= 90) ||
    (97 <= code && code <= 122)
  );
}

export function getSelectionText() {
  return window.getSelection()!.toString();
}

export function copySelection() {
  navigator.clipboard.writeText(getSelectionText());
}

export function printUsername() {
  return c.green(player.username);
}

export function printOS() {
  return c.blue(osName);
}

export function printCompany(colored = true) {
  if (colored) {
    return c.blue(companyName);
  } else {
    return companyName;
  }
}

export async function dotLoadingBar({
  desc,
  dots = 5,
  intervalMs = 1000,
  onFinish = 'Done!',
  interruptible = false,
}: {
  desc: string;
  dots?: number;
  intervalMs?: number;
  onFinish?: string;
  interruptible?: boolean;
}): Promise<boolean> {
  if (interruptible) {
    setInterruptFlag(false);
  }

  term.write(desc);
  for (let i = 0; i < dots; i++) {
    await sleep(intervalMs);
    if (interruptible && interruptFlag) {
      term.writeln('');
      break;
    }
    term.write('.');
  }
  term.writeln(' ' + onFinish);

  setInterruptFlag(true);
  return true;
}

export async function rotatingLoadingBar({
  desc,
  rotations = 12,
  intervalMs = 250,
  doneMsg = 'Done!',
  interruptible = false,
}: {
  desc: string;
  rotations?: number;
  intervalMs?: number;
  doneMsg?: string;
  interruptible?: boolean;
}): Promise<boolean> {
  if (interruptible) {
    setInterruptFlag(false);
  }

  const rotSymbols = ['-', '\\', '|', '/'];
  for (let i = 0; i < rotations; i += 1) {
    term.write('\r');
    term.write(`[${rotSymbols[i % 4]}] ${desc}`);
    await sleep(intervalMs);

    if (interruptible && interruptFlag) {
      term.writeln('');
      return false;
    }
  }

  setInterruptFlag(true);
  term.writeln(' ' + doneMsg);
  return true;
}

export {c};
