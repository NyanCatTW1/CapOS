import {term, lineInput} from './term';
import {version} from './misc/constant';
import {sleep} from './misc/asyncHelper';
import {
  printUsername,
  printCompany,
  printOS,
  dotLoadingBar,
} from './misc/termHelper';
import {player} from './playerData';

async function setupSystem() {
  term.writeln(`Setting up ${printOS()} for the first time...`);
  await sleep(1000);
  term.writeln('Activating serial code [RW9MG-QR4G3-2WRR9-TG7BH-33GXB]...');
  await sleep(1000);
  term.writeln('Serial activated!');

  await sleep(500);
  term.writeln('Starting OOBE...');
  await sleep(1000);

  term.clear();
  term.writeln(
    `Welcome to the ${printOS()} community, brought to you by ${printCompany()}!`
  );
  term.writeln(
    `${printCompany()} is a new-era organization focusing on providing our customers with  state-of-the-art captcha-solving service.`
  );
  term.writeln(
    `You've chosen ${printOS()} because you wish to join us in becoming and developing the  next-generation captcha solver.`
  );
  term.writeln(
    'You will find details on how to start solving captchas after the system setup.'
  );
  term.writeln(
    'We wish to see you become one of our most proficient captcha solvers soon!'
  );
  term.writeln(`- ${printCompany()}`);
  term.writeln('');

  while (player.username === '') {
    player.username = await lineInput('Please enter your username: ');
  }
  term.writeln(`Nice to meet you, ${printUsername()}!`);
  term.writeln('');

  await dotLoadingBar({
    desc: `Registering ${printUsername()} on ${printCompany()}`,
    intervalMs: player.serverLatencyMs,
  });
  term.writeln('');

  player.systemSetup = true;
}

export async function bootOS() {
  term.writeln('Starting ' + version);
  await sleep(600);
  term.writeln(
    `smpboot: CPU0: ${printCompany(false)}(R) Core(TM) T3-Gen0 CPU @ 1KHz`
  );
  await sleep(200);
  term.writeln('r8169 0000:02:00.0 eth0: Link is Down');
  await sleep(1000);
  term.writeln(
    'r8169 0000:02:00.0 eth0: Link is Up - 1Pkts/Full - flow control rx/tx'
  );
  await sleep(200);
  term.writeln('Welcome to ' + printOS() + '!');
  term.writeln('');

  if (!player.systemSetup) {
    await setupSystem();
  } else {
    term.writeln(`Welcome back, ${printUsername()}!`);
  }

  term.writeln("Type 'help' for a list of commands");
}
