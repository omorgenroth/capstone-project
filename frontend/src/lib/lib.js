export function sortByName(array) {
  return array.sort((a, b) => a.name.localeCompare(b.name))
}

export function addIsSelectedValue(array) {
  return array.map((element) => ({ ...element, isSelected: false }))
}
