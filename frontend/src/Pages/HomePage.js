import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import logoSmall from '../Assets/logo_sm.png'

export default function Home() {
  return (
    <HomePageStyled>
      <LogoStyled src={logoSmall} />
      <LinkStyled to="/dishes/all"> Start </LinkStyled>
    </HomePageStyled>
  )
}

const HomePageStyled = styled.div`
  max-width: 100%;
  height: 100vh;
  display: grid;
  place-items: center;
  grid-template-rows: repeat(3, 1fr);
  background-color: var(--c-green);
`

const LinkStyled = styled(Link)`
  background-color: var(--c-orange);
  text-decoration: none;
  border: none;
  border-radius: 15px;
  color: var(--c-white);
  padding: 10px;
  margin: 0 auto;
  cursor: pointer;
  grid-row: 3/4;
`

const LogoStyled = styled.img`
  width: 20%;
  position: fixed;
  top: 5px;
`
