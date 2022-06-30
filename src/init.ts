import {term, setupTerm} from './term';
// import {player} from './playerData';

window.addEventListener('load', () => {
  setupTerm();
  term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ');
});
