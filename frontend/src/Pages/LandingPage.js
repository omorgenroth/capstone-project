import logo from '../Assets/logo.png'
import styled from 'styled-components/macro'
import { useHistory } from 'react-router-dom'

export default function LandingPage({ loading }) {
  let history = useHistory()

  if (!loading) {
    history.push('/home')
  }

  return (
    <Grid>
      <LogoStyled src={logo} alt="" />
    </Grid>
  )
}

const Grid = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--c-green);
`

const LogoStyled = styled.img`
  width: 50%;
`
