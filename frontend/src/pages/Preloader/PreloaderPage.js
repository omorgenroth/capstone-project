import { Flex, Image } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'
import logo from '../../assets/logo.png'
import PropTypes from 'prop-types'
import { loadLocally } from '../../services/localStorage'
import { getActiveUserList, getUserById } from '../../services/fetchUsers'
import { useContext } from 'react'
import UserContext from '../../context/UserContext'

LandingPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.bool,
}

export default function LandingPage({ error }) {
  let history = useHistory()
  const { setUser, setCurrentList } = useContext(UserContext)

  const tokenData = loadLocally('userData')

  if (tokenData === null) {
    history.push('login')
  } else {
    loadUserData(tokenData.user)
  }

  async function loadUserData(userId) {
    const userData = await getUserById(userId)
    setUser(userData[userData.length - 1])
    const currList = await getActiveUserList(userId)
    setCurrentList(currList[currList.length - 1])
    history.push('/home')
  }

  return (
    <Flex
      bg="primaryGreen.500"
      directen="column"
      justify="center"
      align="center"
      height="100vh">
      <Image src={logo} alt="" width="50%" />
      {error && <div> Couldn`t connect to Server</div>}
    </Flex>
  )
}
