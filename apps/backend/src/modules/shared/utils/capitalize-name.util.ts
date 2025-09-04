export function capitalizeName(value: string): string {
  if (!value) return value;

  const lowerExceptions = ['da', 'de', 'do', 'das', 'dos', 'e'];

  return value
    .trim()
    .split(' ')
    .map((word) => {
      if (/^([A-Z]\.)+[A-Z]?\.?$/.test(word)) {
        return word;
      }

      const lowerWord = word.toLowerCase();

      if (lowerExceptions.includes(lowerWord)) {
        return lowerWord;
      }

      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}
