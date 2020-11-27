import Logo from '../Assets/Logo.png'
import styled from 'styled-components/macro'

export default function LandingPage() {
  return (
    <Grid>
      <LogoStyled src={Logo} alt="" />
    </Grid>
  )
}

const Grid = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const LogoStyled = styled.img`
  width: 50%;
`
