import logo from '../Assets/logo.png'
import styled from 'styled-components/macro'
import { useHistory } from 'react-router-dom'

export default function LandingPage({ loading, error }) {
  let history = useHistory()

  setTimeout(() => {
    if (!loading && !error) {
      history.push('/home')
    }
  }, 3000)

  return (
    <Flex>
      <LogoStyled src={logo} alt="" />
      {error && <div> Couldn`t connect to Server</div>}
    </Flex>
  )
}

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--c-green);
`

const LogoStyled = styled.img`
  width: 50%;
  margin: 20px;
`
