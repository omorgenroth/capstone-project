import { useState } from 'react'
import { loadLocally } from '../services/localStorage'

export default function useAuth() {
  const [isAuthorized, setIsAuthorized] = useState()

  const userData = loadLocally('userData')
}
