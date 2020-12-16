export function saveLocally(key, value) {
  console.log(key)
  console.log(value)
  localStorage.setItem(key, JSON.stringify(value))
}

export function loadLocally(key) {
  return JSON.parse(localStorage.getItem(key))
}
