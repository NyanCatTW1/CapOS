const version = '0.0.0';
const osName = 'CapOS';
const companyName = 'The Solvers';
const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVXYZ';

export function setVersionInTitle() {
  document.title = `${osName} v${version}`;
}

export {version, osName, companyName, upperChars};
