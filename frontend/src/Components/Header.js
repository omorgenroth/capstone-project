import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import logoSmall from '../Assets/logo_sm.png'
import { AiFillSetting } from 'react-icons/ai'

export default function Header({ children }) {
  return (
    <HeaderStyled>
      <LogoStyled src={logoSmall} />
      <CheckContainer></CheckContainer>
    </HeaderStyled>
  )
}

const HeaderStyled = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  z-index: 10;
  background-color: var(--c-green);
  box-shadow: 0px 0px 6px 3px rgba(0, 0, 0, 0.08);
  position: fixed;
  top: 0;
  width: 100%;
  height: 56px;
`

const CloseContainer = styled.div`
  text-decoration: none;
  color: var(--c-blue);
  font-size: 0.9rem;
  position: fixed;
  left: 25px;
  &:active {
    color: var(--c-white);
  }
`
const CheckContainer = styled.div`
  text-decoration: none;
  color: var(--c-blue);
  display: flex;
  position: fixed;
  top: 12px;
  right: 26px;
  &:active {
    color: var(--c-white);
  }
`

const LogoStyled = styled.img`
  width: 45px;
  height: 45px;
`
