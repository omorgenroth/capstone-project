import axios from 'axios'

const baseUrl = 'http://capstone.local/auth'

export async function loginUser({ email, password }) {
  try {
    const response = await axios.post(baseUrl + '/login', {
      email: email,
      password: password,
    })

    return response.data
  } catch (err) {
    return { error: true }
  }
}
