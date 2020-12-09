const baseUrl = 'http://capstone.local/lists'

export async function getAllLists() {
  try {
    const response = await fetch(baseUrl)
    const data = response.json()
    return data
  } catch (err) {
    return { error: true }
  }
}

export async function saveList(list) {
  try {
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    const raw = JSON.stringify(list)
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    }

    const response = await fetch(baseUrl, requestOptions)
    const data = response.json()
    return data
  } catch (err) {
    return { error: true }
  }
}

export async function updateList(list, id) {
  try {
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    const raw = JSON.stringify(list)
    const requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    }

    const response = await fetch(baseUrl + '/' + id, requestOptions)
    const data = response.json()
    return data
  } catch (err) {
    return { error: true }
  }
}
