export function saveLocally(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function loadLocally(key) {
  return JSON.parse(localStorage.getItem(key))
}
