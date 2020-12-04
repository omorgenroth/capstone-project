const baseUrl = 'http://capstoner.local/dishes'

export default async function getAllDishes() {
  try {
    const response = await fetch(baseUrl)
    const data = response.json()
    return data
  } catch (err) {
    return { error: true }
  }
}
