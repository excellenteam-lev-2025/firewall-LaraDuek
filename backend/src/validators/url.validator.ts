
import validator from 'validator';

export function isValidUrl(url: string): boolean {
  return validator.isURL(url);
}
