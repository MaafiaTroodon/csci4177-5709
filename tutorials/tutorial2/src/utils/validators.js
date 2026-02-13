export const isLettersOnly = (s) => /^[A-Za-z]+$/.test(s);

export const isValidEmail = (s) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

export const isValidPassword = (s) => {
  // min 8 chars, allow alphanumeric + special
  // (This just checks length; you can add stronger rules if you want)
  return typeof s === "string" && s.length >= 8;
};

export const doPasswordsMatch = (p1, p2) => p1 === p2;
