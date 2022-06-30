import {term, lineInput} from './term';
import {version, osName, companyName} from './misc/constant';
import {sleep} from './misc/asyncHelper';
import {c} from './misc/termHelper';
import {player} from './playerData';

async function setupSystem() {
  term.writeln(`Setting up ${osName} for the first time...`);

  player.username = await lineInput('Please enter your username: ');
  player.systemSetup = true;

  term.writeln(`Nice to meet you, ${player.username}!`);
}

export async function bootOS() {
  term.writeln('Starting ' + version);
  await sleep(300);
  term.writeln(`smpboot: CPU0: ${companyName}(R) Core(TM) i3-Gen0 CPU @ 1KHz`);
  await sleep(100);
  term.writeln('r8169 0000:02:00.0 eth0: Link is Down');
  await sleep(500);
  term.writeln(
    'r8169 0000:02:00.0 eth0: Link is Up - 1Pkts/Full - flow control rx/tx'
  );
  await sleep(100);
  term.writeln('Welcome to ' + c.blue(osName) + '!');
  term.writeln('');

  if (!player.systemSetup) {
    await setupSystem();
  }
}
