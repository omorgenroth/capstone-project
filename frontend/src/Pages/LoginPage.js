import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Flex,
  chakra,
  Button,
  Text,
  FormErrorMessage,
} from '@chakra-ui/react'
import { useContext, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import AppStateContext from '../context/AppStateContext'
import UserContext from '../context/UserContext'
import { loginUser } from '../services/fetchAuthentication'
import { getActiveUserList, getUserById } from '../services/fetchUsers'
import { saveLocally } from '../services/localStorage'

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
          <chakra.form>
            <FormControl
              isRequired
              isInvalid={state === 'error' ? true : false}>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="email"
                placeholder="max@mustermann.de"
                bg="white"
              />
            </FormControl>
            <FormControl
              mt={6}
              isRequired
              isInvalid={state === 'error' ? true : false}>
              <FormLabel>Passwort</FormLabel>
              <Input
                name="password"
                type="password"
                placeholder="*******"
                bg="white"
              />
              <FormErrorMessage px="10px" color="primaryBlue.500">
                Passwort oder E-Mail falsch
              </FormErrorMessage>
            </FormControl>

            <Button
              width="full"
              mt={4}
              type="submit"
              isLoading={state === 'loading' ? true : false}
              loadingText="Submitting"
              onClick={(e) => handleUserLogin(e)}>
              Sign In
            </Button>
          </chakra.form>
        </Box>
      </Box>
      <CreateAccountLink to="/register" fontSize="xs">
        Erstelle einen Account
      </CreateAccountLink>
    </Flex>
  )

  async function handleUserLogin(e) {
    e.preventDefault()
    const form = e.target.form
    const email = form.email.value
    const password = form.password.value
    form.reset()
    setState('loading')
    const tokenData = await loginUser({ email: email, password: password })
    if (tokenData.error) {
      setState('error')
      console.log('error mit token')
    } else {
      console.log(tokenData)
      saveLocally('userData', tokenData)
      const userData = await getUserById(tokenData.user)
      setUser(userData[userData.length - 1])
      const currList = await getActiveUserList(tokenData.user)
      setCurrentList(currList[currList.length - 1])
      history.push('/home')
    }
  }
}
