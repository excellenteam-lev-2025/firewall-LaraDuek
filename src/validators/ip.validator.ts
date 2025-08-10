const net = require('net');
export function isValidIp(ip: string): boolean {
  return net.isIP(ip);
}
