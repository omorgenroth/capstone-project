import styled from 'styled-components/macro'
import { FaPlus } from 'react-icons/fa'

export default function LandingPage() {
  return (
    <LandingPageStyled>
      <Button>
        Start
        <FaPlus />
      </Button>
    </LandingPageStyled>
  )
}

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
`

const LandingPageStyled = styled.div`
  max-width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-auto-columns;
`

//TODO Refactor CSS
