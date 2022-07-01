import {term, lineInput} from './term';
import {version, osName, companyName} from './misc/constant';
import {sleep} from './misc/asyncHelper';
import {c} from './misc/termHelper';
import {player} from './playerData';

async function setupSystem() {
  term.writeln(`Setting up ${osName} for the first time...`);
  await sleep(1000);
  term.writeln('Activating serial code [RW9MG-QR4G3-2WRR9-TG7BH-33GXB]...');
  await sleep(1000);
  term.writeln('Serial activated!');

  await sleep(500);
  term.writeln('Starting OOBE...');
  await sleep(1000);

  term.clear();
  term.writeln(
    `Thank you for joining the ${c.blue(
      osName
    )} community, brought to you by ${c.blue(companyName)}!`
  );
  term.writeln(
    `${c.blue(
      companyName
    )} is a new-era organization focusing on providing our customers with  state-of-the-art captcha-solving service.`
  );
  term.writeln(
    `You've chosen ${c.blue(
      osName
    )} because you wish to join us in becoming and developing the  next-generation captcha solver.`
  );
  term.writeln(
    'You will find details on how to start solving captchas after the system setup.'
  );
  term.writeln(
    'We wish to see you become one of our most proficient captcha solvers soon!'
  );
  term.writeln(`- ${c.blue(companyName)}`);
  term.writeln('');

  player.username = await lineInput('Please enter your username: ');
  term.writeln(`Nice to meet you, ${c.green(player.username)}!`);
  term.writeln('');

  player.systemSetup = true;
}

export async function bootOS() {
  term.writeln('Starting ' + version);
  await sleep(600);
  term.writeln(`smpboot: CPU0: ${companyName}(R) Core(TM) T3-Gen0 CPU @ 1KHz`);
  await sleep(200);
  term.writeln('r8169 0000:02:00.0 eth0: Link is Down');
  await sleep(1000);
  term.writeln(
    'r8169 0000:02:00.0 eth0: Link is Up - 1Pkts/Full - flow control rx/tx'
  );
  await sleep(200);
  term.writeln('Welcome to ' + c.blue(osName) + '!');
  term.writeln('');

  if (!player.systemSetup) {
    await setupSystem();
  }
}
