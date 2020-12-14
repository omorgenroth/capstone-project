import axios from 'axios'

const baseUrl = 'http://capstone.local/ingredients'

export async function getAllIngredients() {
  try {
    const response = await fetch(baseUrl)
    const data = response.json()
    return data
  } catch (err) {
    return { error: true }
  }
}

export async function filterIngredientsByName($name) {
  try {
    const response = await axios(baseUrl + '/filter/' + $name)
    return response.data
  } catch (error) {
    return error
  }
}
