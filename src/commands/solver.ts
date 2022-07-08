import {addCommand, Command, cmds} from '../cmd';
import {term} from '../term'
import {printCompany} from '../misc/termHelper'
import {version} from '../misc/constant';

const solverDesc = `${printCompany()} Command Line Interface, ver ${version}`;
function solverCmdHandler(argc: number, argv: string[]) {
  if (argc != 1) {
    if (argv[1] == 'verify') {
      term.writeln('TODO');
      return 0;
    }
  }

  term.writeln(solverDesc);
  term.writeln('Usage:')
  term.writeln(`${argv[0]} verify: Starts the verification process`)
  term.writeln('');
  return 0;
}

export function setupSolverCommand() {
  addCommand(
    new Command({
      name: 'solver',
      desc: solverDesc,
      cmdHandler: solverCmdHandler,
    })
  );
}