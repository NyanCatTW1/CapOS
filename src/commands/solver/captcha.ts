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

const tierRewards = ['None (Training captcha)'];
const tierPenalties = ['None'];

export function printCurrentCaptcha() {
  const tier = player.curCaptchaTier;
  term.writeln(`Difficulty: T${tier}`);
  term.writeln(`Solve reward: ${tierRewards[tier]}`);
  term.writeln(`Fail penalty: ${tierPenalties[tier]}`);
  term.writeln('');
  term.writeln(player.curCaptcha);
}

function randint(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
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
    desc: `Requesting T${tier} captcha from ${printCompany()}`,
  });

  setNewCaptcha(tier);
  printCurrentCaptcha();
  return 0;
}

export async function solveCaptcha(answer: string): Promise<number> {
  await dotLoadingBar({
    desc: `Submitting answer to ${printCompany()}`,
  });

  player.curCaptcha = '';

  if (player.curCaptchaAnswer === answer) {
    const tier = player.curCaptchaTier;
    player.captchaSolves[tier] += 1;

    term.writeln('Correct answer! :tada:');
    term.writeln(
      `You have solved ${player.captchaSolves[tier]} T${tier} captchas.`
    );

    if (player.captchaSolves[0] >= 5) {
      solverTierUp(2);
    }

    if (player.captchaSolves[0] >= 10000) {
      solverTierUp(3);
    }
  } else {
    term.writeln('Invalid answer! :oof:');
    term.writeln('No penalty was issued.');
    term.writeln('To continue solving, fetch a new task.');
  }

  return 0;
}
