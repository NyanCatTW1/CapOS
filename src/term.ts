import {Terminal} from 'xterm';

const term = new Terminal();

export function setupTerm() {
  term.open(document.getElementById('terminal')!);
}

export {term};
