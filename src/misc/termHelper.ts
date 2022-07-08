import {player} from '../playerData';
import {companyName, osName} from './constant';

const c = require('ansi-colors');
// Need to enable it manually for some reason
c.enabled = true;

export function isAlphanumeric(char: string) {
  const code = char.charCodeAt(0);
  return (
    (48 <= code && code <= 57) ||
    (65 <= code && code <= 90) ||
    (97 <= code && code <= 122)
  );
}

export function getSelectionText() {
  return window.getSelection()!.toString();
}

export function copySelection() {
  navigator.clipboard.writeText(getSelectionText());
}

export function printUsername() {
  return c.green(player.username);
}

export function printOS() {
  return c.blue(osName);
}

export function printCompany(colored = true) {
  if (colored) {
    return c.blue(companyName);
  } else {
    return companyName;
  }
}

export {c};
