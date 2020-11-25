import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'

export default function LandingPage({ onClickStart }) {
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
  grid-template-rows: 1fr 1fr 1fr;
`

const LinkStyled = styled(Link)`
  background-color: var(--c-white);
  text-decoration: none;
  border: none;
  border-radius: 25px;
  color: var(--c-gray);
  grid-row: 3;
  padding: 6px;
  max-height: 30px;
  width: 60px;
  margin: 0 auto;
  cursor: pointer;
`

const Button = styled.button`
  background-color: var(--c-white);
  border: none;
  border-radius: 25px;
  color: var(--c-gray);
  padding: 10px;
  grid-row: 3;
  max-height: 30px;
  width: 60px;
  margin: 0 auto;
  cursor: pointer;
`

//TODO Refactor CSS
