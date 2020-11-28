import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

HeaderOverlay.propTypes = {
  children: PropTypes.string,
}

export default function HeaderOverlay({ children }) {
  return (
    <HeaderStyled>
      <LinkStyled to="/home">X</LinkStyled>
      {children}{' '}
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
  border-radius: 0 0 15px 15px;
  position: fixed;
  top: 0;
  width: 100%;
  height: 56px;
`

const LinkStyled = styled(Link)`
  text-decoration: none;
  color: var(--c-gray);
  font-size: 1rem;
  padding: 5px;
  position: fixed;
  left: 20px;
`
