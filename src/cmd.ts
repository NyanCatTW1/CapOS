import {term, lineInput} from './term';
import {printUsername, c} from './misc/termHelper';
import {player} from './playerData';

function getPS() {
  return (
    printUsername() +
    c.green('@capos') +
    ' ' +
    c.blue(player.path) +
    c.blue(' $ ')
  );
}

export async function runCommandHandler() {
  for (;;) {
    const cmd = await lineInput(getPS());
    const cmdName = cmd.split(' ')[0];
    switch (cmdName) {
      case '':
        // No command fed
        break;
      default:
        term.writeln('csh: command not found: ' + cmdName);
        break;
    }
  }
}
