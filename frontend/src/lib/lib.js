export function sortByName(array) {
  return array.sort((a, b) => a.name.localeCompare(b.name))
}
