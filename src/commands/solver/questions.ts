import {
  printUsername,
  rotatingLoadingBar,
  c,
  printCompany,
} from '../../misc/termHelper';
import {player} from '../../playerData';
import {term} from '../../term';
import {addQuestion, Question} from './library';

export function addQuestions() {
  addQuestion(
    new Question({
      name: 'How to ask communicative questions?',
      id: 0,
      isUnlocked: () => true,
      onAsked: async () => {
        term.writeln(
          `Hello, ${printUsername()}! Everyone asks questions, but most of them are awful at conveying information. Just look at SO, and you'll see what I mean.`
        );
        term.writeln(
          "While these 10 tips won't immediately make you the best asker on the planet, they will definitely guide you in a direction."
        );
        term.writeln("Let's begin with tip 1...");

        for (let i = 1; i <= 10; i += 1) {
          await rotatingLoadingBar({desc: `Learning tip ${i}...`});
        }

        term.writeln(
          'Damn, your reading speed is faster than 98.34% of Tier 2 users! Is that also how you managed to sign our 10-page contract in 14928ms, according to the statistics?'
        );
        term.writeln("Well, good job! I'll wait for your next question...");

        if (!player.libraryAskedQuestions.includes(0)) {
          player.libraryAskedQuestions.push(0);
        }
        return;
      },
    })
  );

  addQuestion(
    new Question({
      name: 'Why does it take so many solves to reach tier 3?',
      id: 1,
      isUnlocked: () => player.libraryAskedQuestions.includes(0),
      onAsked: async () => {
        term.writeln(
          `Good question, ${printUsername()}! You're not the first person wondering that. In fact, 83.48% of Tier 2 users asked this question right after their first question.`
        );
        term.writeln(
          c.bold(
            "We made the requirement high to filter out those who don't sharpen their saws."
          )
        );
        term.writeln(
          "Don't you want to make that 5-second delay between requests shorter? Or maybe something that helps you solve the equation?"
        );
        term.writeln(
          'Screw it. Why not just automate the solving process entirely? It is explicitly allowed on the seventh page of the contract.'
        );
        term.writeln(
          "We don't want people who just grind their way to the end. Instead, we want people who know how to reduce their work or even remove the work from themselves."
        );
        term.writeln('And that is why we made the requirement high.');

        if (!player.libraryAskedQuestions.includes(1)) {
          player.libraryAskedQuestions.push(1);
        }
        return;
      },
    })
  );

  addQuestion(
    new Question({
      name: 'How do I speed up requests?',
      id: 2,
      isUnlocked: () => player.libraryAskedQuestions.includes(1),
      onAsked: async () => {
        term.writeln('There are two things that slow down requests:');
        term.writeln('1. Your network connection');
        term.writeln('2. Latency of the server');

        term.writeln('');
        term.writeln(
          'You can upgrade your connection once you start earning trust with T1 captchas.'
        );
        term.writeln(
          'However, you could immediately reduce the latency by running a hidden beta subroutine in the solver.'
        );
        term.writeln(
          `Thanks to the annoying '${printCompany()} Beta Program NDA Filter,' I can only give out segments of the name. I'm sure you can figure it out.`
        );
        term.writeln('Selector');
        term.writeln('Beta');
        term.writeln('TheSolver');
        term.writeln('auto');
        term.writeln('Mirror');

        term.writeln('');
        term.writeln('Good luck.');

        if (!player.libraryAskedQuestions.includes(2)) {
          player.libraryAskedQuestions.push(2);
        }
        return;
      },
    })
  );
}
