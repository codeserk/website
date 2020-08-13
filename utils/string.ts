/**
 * Removes special characters in a given string
 *
 * @param str
 *
 * @returns string without special characters
 */
export function removeSpecialCharacters(str: string): string {
  return str
    .replace(/^[^\w\s\d!?]/g, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036F]/g, '')
}
