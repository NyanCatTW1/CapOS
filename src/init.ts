import {setupTerm} from './term';
import {bootOS} from './boot';
import {setVersionInTitle} from './misc/constant';
// import {player} from './playerData';

window.addEventListener('load', async () => {
  setupTerm();
  setVersionInTitle();
  await bootOS();
});
