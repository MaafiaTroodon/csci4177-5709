const AUTH_KEY = "t3_auth";

export function isAuthenticated() {
  return localStorage.getItem(AUTH_KEY) === "1";
}

export function setAuthenticated(isAuthed) {
  if (isAuthed) {
    localStorage.setItem(AUTH_KEY, "1");
    return;
  }
  localStorage.removeItem(AUTH_KEY);
}

export function clearAuthentication() {
  localStorage.removeItem(AUTH_KEY);
}
