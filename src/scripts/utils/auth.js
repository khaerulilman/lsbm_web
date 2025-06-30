import CONFIG from "../config";

export function getAccessToken() {
  return localStorage.getItem(CONFIG.ACCESS_TOKEN_KEY);
}

export function putAccessToken(token) {
  localStorage.setItem(CONFIG.ACCESS_TOKEN_KEY, token);
}

export function removeAccessToken() {
  localStorage.removeItem(CONFIG.ACCESS_TOKEN_KEY);
}

export function isAuthenticated() {
  return !!getAccessToken();
}

export function checkAuth() {
  if (!isAuthenticated()) {
    window.location.hash = "#/login";
    return false;
  }
  return true;
}

export function checkUnauth() {
  if (isAuthenticated()) {
    window.location.hash = "#/";
    return false;
  }
  return true;
}
