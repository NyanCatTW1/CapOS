import {upperChars} from '../../misc/constant';
import {randint, randomString} from '../../misc/randHelper';
import {printUsername, c, dotLoadingBar} from '../../misc/termHelper';
import {player} from '../../playerData';
import {term} from '../../term';

export async function solverMirrorSelectorCmd(): Promise<number> {
  term.writeln(
    `${c.bold(
      'TODO: '
    )}Verify whether ${printUsername()} is in the beta program`
  );

  term.writeln('Testing latency to 10 mirrors (4 attempts)...');
  let slowServer = -1,
    fastServer = -1;
  let fastServerName = '';
  while (slowServer === fastServer) {
    slowServer = randint(0, 9);
    fastServer = randint(0, 9);
  }

  for (let i = 0; i < 10; i += 1) {
    let serverMs = randint(150, 950);
    const serverName = randomString(2, upperChars);
    if (i === slowServer) serverMs = 1000;
    else if (i === fastServer) {
      serverMs = 100;
      fastServerName = serverName;
    }

    await dotLoadingBar({
      desc: `Testing ${serverName} server`,
      dots: 4,
      intervalMs: serverMs,
      onFinish: `${serverMs}ms`,
    });
  }

  term.writeln(`Switched to ${fastServerName} with 100ms latency`);
  player.serverLatencyMs = 100;

  return 0;
}
