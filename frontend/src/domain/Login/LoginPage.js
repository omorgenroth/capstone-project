import { Box, chakra, Flex, Heading } from '@chakra-ui/react'
import { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import AppStateContext from '../../context/AppStateContext'
import UserContext from '../../context/UserContext'
import { loginUser } from '../../services/fetchAuthentication'
import { getActiveUserList, getUserById } from '../../services/fetchUsers'
import { saveLocally } from '../../services/localStorage'
import LoginForm from './LoginForm/LoginForm'

export default function LoginPage() {
  const CreateAccountLink = chakra(Link)
  const { setUser, setCurrentList } = useContext(UserContext)
  const { state, setState } = useContext(AppStateContext)

  const history = useHistory()

  return (
    <Flex
      width="full"
      align="center"
      justifyContent="center"
      direction="column"
      height="100vh"
      bg="primaryGreen.500"
      color="primaryBlue.500">
      <Box p={2} border="1px solid white" borderRadius="10px">
        <Box textAlign="center">
          <Heading>Login</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <LoginForm
            state={state}
            submitData={(props) => handleUserLogin(props)}
          />
        </Box>
      </Box>
      <CreateAccountLink to="/register" fontSize="xs">
        Erstelle einen Account
      </CreateAccountLink>
    </Flex>
  )

  async function handleUserLogin(props) {
    setState('loading')
    const tokenData = await loginUser({
      email: props.email,
      password: props.password,
    })
    if (tokenData.error) {
      setState('error')
      console.log('error mit token')
    } else {
      saveLocally('userData', tokenData)
      const userData = await getUserById(tokenData.user)
      setUser(userData[userData.length - 1])
      const currList = await getActiveUserList(tokenData.user)
      setCurrentList(currList[currList.length - 1])
      history.push('/home')
    }
  }
}
