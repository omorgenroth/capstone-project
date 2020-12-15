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
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export default function LoginPage() {
  const CreateAccountLink = chakra(Link)
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
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="test@test.com" bg="white" />
            </FormControl>
            <FormControl mt={6}>
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="*******" bg="white" />
            </FormControl>
            <Button width="full" mt={4} type="submit">
              Sign In
            </Button>
          </chakra.form>
        </Box>
      </Box>
      <CreateAccountLink to="/register" fontSize="xs">
        Create Account
      </CreateAccountLink>
    </Flex>
  )
}
