import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

export default function LandingPage() {
  return (
    <LandingPageStyled>
      <LinkStyled to="/dishes"> Start </LinkStyled>
    </LandingPageStyled>
  )
}

const LandingPageStyled = styled.div`
  max-width: 100%;
  height: 100vh;
  display: grid;
  place-items: center;
  grid-template-rows: repeat(3, 1fr);
`

const LinkStyled = styled(Link)`
  background-color: var(--c-white);
  text-decoration: none;
  border: none;
  border-radius: 15px;
  color: var(--c-gray);
  padding: 10px;
  margin: 0 auto;
  cursor: pointer;
  grid-row: 3/4;
`
