const baseUrl = 'http://capstone.local/users'

export async function getUserById(userId) {
  try {
    const response = await fetch(baseUrl + '/' + userId)
    const data = response.json()
    return data
  } catch (err) {
    return { error: true }
  }
}

export async function getUserLists(userId) {
  try {
    const response = await fetch(baseUrl + '/' + userId + '/lists')
    const data = response.json()
    return data
  } catch (err) {
    return { error: true }
  }
}

export async function getActiveUserList(userId) {
  try {
    const response = await fetch(baseUrl + '/' + userId + '/lists/active')
    const data = response.json()
    return data
  } catch (err) {
    return { error: true }
  }
}
