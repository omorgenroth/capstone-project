const baseUrl = 'http://capstone.local/users'

export async function getUserLists(id) {
  try {
    const response = await fetch(baseUrl + '/' + id + '/lists')
    const data = response.json()
    return data
  } catch (err) {
    return { error: true }
  }
}
