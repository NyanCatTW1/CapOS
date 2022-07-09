import {randint} from '../../misc/randHelper';
import {c, dotLoadingBar, printCompany} from '../../misc/termHelper';
import {player} from '../../playerData';
import {term} from '../../term';
import {solverTierUp, printTier} from './tier';

export function highestCaptchaTier() {
  let ret = -1;
  if (player.accountTier >= 1) {
    ret = 0;
  }

  return ret;
}

const tierNames = ['T0 (Training captcha)'];
const tierRewards = ['None'];
const tierPenalties = ['None'];

export function printCurrentCaptcha() {
  const tier = player.curCaptchaTier;
  term.writeln(`Difficulty: ${tierNames[tier]}`);
  term.writeln(`Solve reward: ${tierRewards[tier]}`);
  term.writeln(`Fail penalty: ${tierPenalties[tier]}`);
  term.writeln('');
  term.writeln(player.curCaptcha);
}

function setNewCaptcha(tier: number) {
  player.curCaptchaTier = tier;
  if (tier === 0) {
    const a = randint(10000, 99999),
      b = randint(10000, 99999);
    player.curCaptcha = `Please calculate ${a}+${b}`;
    player.curCaptchaAnswer = (a + b).toString();
  }
}

export async function requestNewCaptcha(
  tier: number,
  auto = false
): Promise<number> {
  if (player.curCaptcha !== '') {
    if (player.curCaptchaTier === tier) {
      term.writeln('Notice: Task with the same tier already exists on local');
      return 0;
    } else {
      term.writeln(
        `${c.red('Error:')} Task with a different tier already exists on local`
      );
      return -1;
    }
  }

  if (
    !(await dotLoadingBar({
      desc: `Requesting ${tierNames[tier]} captcha from ${printCompany()}`,
      intervalMs: player.serverLatencyMs,
      interruptible: true,
    }))
  )
    return -1;

  if (tier === 0 && player.accountTier !== 1 && !auto) {
    term.writeln(
      `${c.red(
        'Access denied'
      )}: Manual T0 Captchas are only available to ${printTier(1)} users.`
    );
    return -1;
  }

  if (tier === 0 && player.accountTier !== 2 && auto) {
    term.writeln(
      `${c.red(
        'Access denied'
      )}: Auto T0 Captchas are only available to ${printTier(2)} users.`
    );
    return -1;
  }

  setNewCaptcha(tier);
  if (!auto) printCurrentCaptcha();
  else term.writeln(player.curCaptcha);
  return 0;
}

export async function solveCaptcha(answer: string): Promise<number> {
  await dotLoadingBar({
    desc: `Submitting answer to ${printCompany()}`,
    intervalMs: player.serverLatencyMs,
  });

  player.curCaptcha = '';

  if (player.curCaptchaAnswer === answer) {
    const tier = player.curCaptchaTier;
    player.captchaSolves[tier] += 1;
    player.captchaSolveStrikes[tier] += 1;

    term.writeln('Correct answer! :tada:');
    term.writeln(
      `You have solved ${player.captchaSolves[tier]} ${tierNames[tier]} captchas.`
    );

    if (player.captchaSolveStrikes[tier] >= 3) {
      term.writeln(
        `You're on a strike of ${player.captchaSolveStrikes[tier]} solves! Keep it rolling!`
      );
    }

    if (player.captchaSolves[0] >= 5) {
      solverTierUp(2);
    }

    if (player.captchaSolves[0] >= 100) {
      solverTierUp(3);
    }
  } else {
    player.captchaSolveStrikes[player.curCaptchaTier] = 0;
    term.writeln('Invalid answer! :oof:');
    term.writeln('Solve strike has been reset.');
    term.writeln('No other penalty was issued.');
    term.writeln('To continue solving, fetch a new task.');
  }

  return 0;
}
