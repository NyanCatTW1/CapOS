import {printLine} from './term';
import {version, osName, companyName} from './misc/constant';
import {sleep} from './misc/asyncHelper';
import {c} from './misc/termColors';

export async function bootOS() {
  printLine('Starting ' + version);
  await sleep(300);
  printLine(`smpboot: CPU0: ${companyName}(R) Core(TM) i3-Gen0 CPU @ 1KHz`);
  await sleep(100);
  printLine('r8169 0000:02:00.0 eth0: Link is Down');
  await sleep(500);
  printLine(
    'r8169 0000:02:00.0 eth0: Link is Up - 1Pkts/Full - flow control rx/tx'
  );
  await sleep(100);
  printLine('Welcome to ' + c.blue(osName) + '!');
  printLine();
}
