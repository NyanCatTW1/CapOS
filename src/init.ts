import {setupTerm} from './term';
import {bootOS} from './boot';
import {setVersionInTitle} from './misc/constant';
import {loadGame, saveGame} from './playerData';
import {runCommandHandler} from './cmd';
import {setupScripts} from './scripts/main';

window.addEventListener('load', async () => {
  setupTerm();
  setVersionInTitle();

  loadGame();

  await bootOS();

  setupScripts();

  window.setInterval(saveGame, 3000);
  await runCommandHandler();
});
