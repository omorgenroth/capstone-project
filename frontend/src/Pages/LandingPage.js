import { Flex, Image } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'
import logo from '../assets/logo.png'
import PropTypes from 'prop-types'

LandingPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.bool,
}

export default function LandingPage({ loading, error }) {
  let history = useHistory()
  console.log(loading)

  if (!loading) {
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
