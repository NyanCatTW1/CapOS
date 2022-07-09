import {randint} from '../../misc/randHelper';
import {dotLoadingBar, printCompany} from '../../misc/termHelper';
import {player} from '../../playerData';
import {term} from '../../term';
import {solverTierUp} from './tier';

export function highestCaptchaTier() {
  let ret = -1;
  if (player.accountTier >= 1) {
    ret = 0;
  }

  return ret;
}

const tierNames = ['T0 (Training captcha)'];
const tierRewards = ['None (Training captcha)'];
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

export async function requestNewCaptcha(tier: number): Promise<number> {
  await dotLoadingBar({
    desc: `Requesting ${tierNames[tier]} captcha from ${printCompany()}`,
    intervalMs: player.serverLatencyMs,
  });

  setNewCaptcha(tier);
  printCurrentCaptcha();
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

    if (player.captchaSolveStrikes[0] >= 1000) {
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
