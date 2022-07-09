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
      name: "Why can't I manually reach tier 3?",
      id: 1,
      isUnlocked: () => player.libraryAskedQuestions.includes(0),
      onAsked: async () => {
        term.writeln(
          `Good question, ${printUsername()}! You're not the first person wondering that. In fact, 99.48% of Tier 2 users asked this question right after their first question.`
        );
        term.writeln(
          c.bold(
            'We made this requirement to filter out those not willing to improve themselves.'
          )
        );
        term.writeln(
          "While solving those 5 T0 captchas, didn't you want to get the 5-second delay between requests shorter? Or maybe get something that helps you solve the equation?"
        );
        term.writeln(
          'Screw it. Why not just automate the solving process entirely? It is explicitly allowed on the seventh page of the contract.'
        );
        term.writeln(
          "We don't want people who just grind their way to the end. Instead, we want people who know how to reduce their work or even remove the work from themselves."
        );
        term.writeln('And that is why we created this requirement.');

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

  addQuestion(
    new Question({
      name: 'How do I start automating captchas?',
      id: 3,
      isUnlocked: () => player.libraryAskedQuestions.includes(1),
      onAsked: async () => {
        term.writeln('There are usually three steps to this:');
        term.writeln('1. Fetch the captcha');
        term.writeln('2. Solve the captcha');
        term.writeln('3. Send request with the answer');
        term.writeln('');

        term.writeln(
          'When automating captchas on websites, you often need to research the webpage structure and API calls.'
        );
        term.writeln(
          `Fortunately, here on ${printCompany()}, we will do the research for you (most of the time). So all you have to do is focus on solving the captcha.`
        );

        term.writeln('');
        term.writeln(
          `To fetch from and submit answers to ${printCompany()}, use our Python API module ${c.bold(
            'theSolvers'
          )}`
        );
        term.writeln(
          "Wait, you don't know what Python is? Well, that is an issue for another day..."
        );

        if (!player.libraryAskedQuestions.includes(3)) {
          player.libraryAskedQuestions.push(3);
        }
        return;
      },
    })
  );

  addQuestion(
    new Question({
      name: 'What the hell is Python?',
      id: 4,
      isUnlocked: () => player.libraryAskedQuestions.includes(3),
      onAsked: async () => {
        term.writeln(
          `${c.bold('Python')} is a ${c.blue('high-level')}, ${c.blue(
            'interpreted'
          )}, ${c.blue(
            'general-purpose programming language'
          )}. Its design philosophy emphasizes ${c.blue(
            'code readability'
          )} with the use of ${c.blue('significant indentation')}.${c.blue(
            '[32]'
          )}`
        );

        term.writeln(
          `Python is ${c.blue('dynamically-typed')} and ${c.blue(
            'garbage-collected'
          )}...wait, why are you falling asleep?`
        );

        term.writeln('');
        term.writeln(
          '...You just want to know how to automate stuff with Python? Okay, let me show you the basics then...'
        );

        const learningSteps = [
          'Learning how to use the Python interpreter...',
          'Learning how to do basic math expressions...',
          'Learning the difference between numbers and strings...',
          'Learning how to convert numbers and strings to another...',
          'Learning how to concat and replicate strings...',
          'Learning what variables are...',
          'Learning how to use and set variables...',
          'Learning how indices work...',
          'Learning how to interact with the user using input and print...',
          'Learning how to use len, split and join on strings and lists...',
          'Summarizing...',
        ];

        for (let i = 0; i < learningSteps.length; i += 1) {
          await rotatingLoadingBar({desc: learningSteps[i], intervalMs: 500});
        }

        term.writeln(
          `With that, you just learned the basics of Python in under ${c.bold(
            (learningSteps.length * 6).toString() + ' seconds'
          )}! Astonishing performance, to say the least.`
        );
        term.writeln('Feel free to ask for help if you ever get stuck.');
        term.writeln(`${c.bold('Command unlocked:')} python`);

        if (!player.libraryAskedQuestions.includes(4)) {
          player.libraryAskedQuestions.push(4);
        }
        return;
      },
    })
  );

  addQuestion(
    new Question({
      name: 'How do I write Python scripts?',
      id: 5,
      isUnlocked: () => player.libraryAskedQuestions.includes(4),
      onAsked: async () => {
        term.writeln(
          "It's the same as using the interpreter. You just need to put the codes in one file and run 'python filename.py'"
        );
        term.writeln(
          "...you don't know how to put codes into a file? Oh yeah, you still don't know how to use vim. Here, let me show you..."
        );

        const learningSteps = [
          'Learning how to use the vim command...',
          'Learning how to enter and exit insert mode...',
          'Learning a few common shortcuts...',
          'Learning how command mode works...',
          'Learning how to quit vim...',
          'Still trying to quit vim...',
        ];

        for (let i = 0; i < learningSteps.length; i += 1) {
          await rotatingLoadingBar({desc: learningSteps[i], intervalMs: 500});
        }

        term.writeln('Now you really know how to write and run scripts!');
        term.writeln(`${c.bold('Command unlocked:')} vim`);
        term.writeln(
          "Recap: Run 'vim filename.py' to write the script. After that, run 'python filename.py' to execute the script."
        );

        if (!player.libraryAskedQuestions.includes(5)) {
          player.libraryAskedQuestions.push(5);
        }
        return;
      },
    })
  );

  addQuestion(
    new Question({
      name: 'How do I use theSolvers module?',
      id: 6,
      isUnlocked: () => player.scriptStepsTried['autoT0.py'].includes(0),
      onAsked: async () => {
        term.writeln("First of all, type 'import theSolvers'. Afterwards...");

        const learningSteps = [
          'Learning the concept of functions...',
          'Learning how to pass arguments to functions...',
          'Learning how modules work in Python...',
          'Learning how to fetch T0 tasks with theSolvers...',
          'Learning how to submit answer with theSolvers...',
        ];

        for (let i = 0; i < learningSteps.length; i += 1) {
          await rotatingLoadingBar({desc: learningSteps[i], intervalMs: 500});
        }

        term.writeln(
          "And that's about it really. Solving the captcha is the fun part, after all."
        );

        if (!player.libraryAskedQuestions.includes(6)) {
          player.libraryAskedQuestions.push(6);
        }
        return;
      },
    })
  );

  addQuestion(
    new Question({
      name: 'How do I make a code repeat itself?',
      id: 7,
      isUnlocked: () => player.scriptStepsTried['autoT0.py'].includes(8),
      onAsked: async () => {
        term.writeln(
          "In case you wanna let it run forever, just put all of the code inside a 'while True:' loop."
        );
        term.writeln(
          "Wait, you don't know how indentations work? Okay, this is hopefully an easy part..."
        );

        const learningSteps = [
          'Learning the basics of indentations...',
          'Learning the difference between spaces and tabs...',
          'Choosing between 2 spaces, 4 spaces and tabs...',
          'Learning the basics of program flow...',
          "'Wait, the flow could go back to previous lines of code?'",
          'Memorizing that while True repeats the code forever...',
          'Learning how indentations affect the range of loops...',
        ];

        for (let i = 0; i < learningSteps.length; i += 1) {
          await rotatingLoadingBar({desc: learningSteps[i], intervalMs: 500});
        }

        term.writeln('That was not an easy part.');

        term.writeln(
          `Oh yeah. Once you want to break the loop, ${c.bold(
            'pressing Ctrl+C'
          )} should stop the script. If that doesn't work, spam Ctrl+C.`
        );

        if (!player.libraryAskedQuestions.includes(7)) {
          player.libraryAskedQuestions.push(7);
        }
        return;
      },
    })
  );
}
