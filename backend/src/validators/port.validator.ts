const MIN_PORT = 1;
const MAX_PORT = 65535;

export function isValidPort(port: number): boolean {
  return Number.isInteger(port) && port >= MIN_PORT && port <= MAX_PORT;
}