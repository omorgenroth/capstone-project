const baseUrl = 'http://capstone.local/dishes'

export async function getAllDishes() {
  const response = await fetch(baseUrl)
  const data = response.json()
  return data
}
