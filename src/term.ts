import {Terminal} from 'xterm';

const term = new Terminal();

export function setupTerm() {
  term.open(document.getElementById('terminal')!);
  term.focus();
}

export function printLine(line = '') {
  // '\n' alone don't move the cursor to the beginning of line
  console.log(line);
  term.write(line + '\r\n');
}

export {term};
