import {dotLoadingBar, printCompany, c} from '../../misc/termHelper';
import {player} from '../../playerData';
import {term, lineInput} from '../../term';
import {addQuestions} from './questions';

export class Question {
  name: string;
  id: number;
  isUnlocked: () => boolean;
  onAsked: () => Promise<void>;

  constructor({
    name,
    id,
    isUnlocked,
    onAsked,
  }: {
    name: string;
    id: number;
    isUnlocked: () => boolean;
    onAsked: () => Promise<void>;
  }) {
    this.name = name;
    this.id = id;
    this.isUnlocked = isUnlocked;
    this.onAsked = onAsked;
  }
}

const libQuestions: {[key: string]: Question} = {};

export function addQuestion(question: Question) {
  libQuestions[question.name] = question;
}

export async function solverLibraryCmd(): Promise<number> {
  addQuestions();

  await dotLoadingBar({
    desc: `Connecting to ${printCompany()} library`,
    dots: 10,
  });

  term.writeln(
    'Welcome! Please enter any questions you have, and our ML-driven assistant will try its best to answer your question.'
  );
  term.writeln('To quit, press Ctrl+C or hit Enter without entering anything.');
  if (player.libraryAskedQuestions.length === 0) {
    term.writeln(
      "Tip: If you don't know what/how to ask, try asking 'How to ask communicative questions?'"
    );
  }

  for (;;) {
    term.writeln('');

    if (player.libraryAskedQuestions.includes(0)) {
      term.writeln('Question ideas:');
      Object.keys(libQuestions).forEach(name => {
        const question = libQuestions[name];
        if (!question.isUnlocked()) return;

        term.write(name);
        if (!player.libraryAskedQuestions.includes(question.id)) {
          term.write(` ${c.bold('(New question!)')}`);
        }
        term.writeln('');
      });
      term.writeln('');
    }

    const inp = (await lineInput('Ask: ')).trim();
    if (inp === '') {
      term.writeln('Good bye!');
      return 0;
    }

    await dotLoadingBar({
      desc: 'Waiting for response',
      dots: 3,
    });

    const question = libQuestions[inp];
    if (question instanceof Question && question.isUnlocked()) {
      await question.onAsked();
    } else {
      term.writeln(
        "I'm not sure what you meant. Maybe you made a typo in your question?"
      );
    }
  }
}
