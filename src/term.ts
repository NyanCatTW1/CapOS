import {Terminal} from 'xterm';
import {sleep} from './misc/asyncHelper';
import ansiEscapes from 'ansi-escapes';
import {isAlphanumeric} from './misc/termHelper';

const term = new Terminal();

export function setupTerm() {
  term.open(document.getElementById('terminal')!);
  term.focus();
}

function getCursorLine() {
  return term.buffer.active.viewportY + term.buffer.active.cursorY;
}

async function setCursorPos(targetX: number, targetY: number) {
  // I have no idea how this works anymore.
  const viewportBottom = viewport + term.rows - 1;

  if (viewportBottom < targetY) {
    term.scrollLines(targetY - viewportBottom);
    viewport = targetY - term.rows + 1;
  }

  term.write(ansiEscapes.cursorTo(targetX, targetY - viewport));
}

let viewport = 0;
let cursorIndex: number;
let lineIndex: number;
let headerLen: number;
let curInput: string[];
let lineListening: boolean;
export async function lineInput(toPrint: string): Promise<string> {
  // Let the cursor position settle
  await sleep(0);

  curInput = [];
  let curBlock = '';
  for (let i = 0; i < toPrint.length; ) {
    // ESC
    if (toPrint.charCodeAt(i) === 27) {
      curBlock += toPrint.substring(i, i + 5);
      i += 5;
    } else {
      curBlock += toPrint[i];
      curInput.push(curBlock);
      curBlock = '';
      i += 1;
    }
  }

  // This happens iff toPrint ends with an escape
  if (curBlock !== '') {
    curInput[curInput.length - 1] += curBlock;
  }

  lineIndex = getCursorLine();
  headerLen = curInput.length;
  cursorIndex = headerLen;

  lineListening = true;

  await renderLine();
  while (lineListening) {
    await sleep(10);
  }

  return curInput.slice(headerLen).join('');
}

async function renderLine() {
  viewport = term.buffer.active.viewportY;
  const toPrint = curInput.join('');

  await setCursorPos(0, lineIndex);
  term.write(ansiEscapes.eraseDown);
  await setCursorPos(0, lineIndex);
  term.write(toPrint);

  const targetX = cursorIndex % term.cols;
  const targetY = lineIndex + Math.floor(cursorIndex / term.cols);

  if (targetX === 0 && targetY >= term.buffer.active.length) {
    // Create new line
    term.write(' ');
  }
  await setCursorPos(targetX, targetY);
}

// TODO: Implement human-friendly copypasting
term.onKey(async e => {
  const key = e.domEvent.key;
  const charCode = e.key.charCodeAt(0);
  if (key === 'F5') {
    location.reload();
  }

  if (lineListening) {
    if (e.key === '\r') {
      term.write('\r\n');
      lineListening = false;
      return;
    } else if (charCode === 127) {
      // Backspace
      if (cursorIndex !== headerLen) {
        curInput.splice(cursorIndex - 1, 1);
        cursorIndex -= 1;
      }
    } else if (key === 'ArrowLeft') {
      if (e.domEvent.ctrlKey) {
        // Move to beginning of previous word
        while (cursorIndex !== headerLen) {
          cursorIndex -= 1;

          if (
            cursorIndex !== headerLen &&
            !isAlphanumeric(curInput[cursorIndex - 1]) &&
            isAlphanumeric(curInput[cursorIndex])
          ) {
            break;
          }
        }
      } else {
        if (cursorIndex !== headerLen) {
          cursorIndex -= 1;
        }
      }
    } else if (key === 'ArrowRight') {
      if (e.domEvent.ctrlKey) {
        // Move to beginning of next word
        while (cursorIndex !== curInput.length) {
          cursorIndex += 1;

          if (
            cursorIndex !== curInput.length &&
            !isAlphanumeric(curInput[cursorIndex - 1]) &&
            isAlphanumeric(curInput[cursorIndex])
          ) {
            break;
          }
        }
      } else {
        if (cursorIndex !== curInput.length) {
          cursorIndex += 1;
        }
      }
    } else if (key === 'Home') {
      cursorIndex = headerLen;
    } else if (key === 'End') {
      cursorIndex = curInput.length;
    } else if (key === 'c' && e.domEvent.ctrlKey) {
      // Ctrl+C
      term.write('\r\n');
      curInput = curInput.splice(headerLen);
      lineListening = false;
      return;
    } else if (32 <= charCode && charCode <= 126) {
      // To avoid the scroll-up bug I can't fix
      if (curInput.length < 1024) {
        curInput.splice(cursorIndex, 0, e.key);
        cursorIndex += 1;
      }
    } else {
      console.log('Unhandled key:', key, charCode);
    }

    await renderLine();
  }
});

export {term};
