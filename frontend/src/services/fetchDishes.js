const baseUrl = 'http://capstone.local/dishes'

export async function getAllDishes() {
  try {
    const response = await fetch(baseUrl)
    const data = response.json()
    return data
  } catch (err) {
    return { error: true }
  }
}
