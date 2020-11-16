export const InvalidChar = (e: { key: string; preventDefault: () => any }) =>
  ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
