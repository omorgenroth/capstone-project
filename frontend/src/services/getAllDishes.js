const baseUrl = 'http://capstone.local/dishes'

export default async function getAllDishes() {
  const response = await fetch(baseUrl)
  const data = response.json()
  return data
}

// TODO catch und Test schreiben
