import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { AiOutlineClose, AiOutlineCheck } from 'react-icons/ai'

HeaderOverlay.propTypes = {
  children: PropTypes.string,
}

export default function HeaderOverlay({
  children,
  counter,
  onClose,
  onCreate,
  listName,
  setName,
}) {
  return (
    <HeaderStyled>
      <CloseContainer onClick={onClose}>
        <Closeicon />
      </CloseContainer>
      <div>
        <InputStyled
          id="name"
          placeholder="Name"
          value={listName}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <CheckContainer onClick={onCreate}>
        {counter !== 0 ? (
          <>
            <Checkicon />
            <Counter>{counter}</Counter>
          </>
        ) : (
          <></>
        )}
      </CheckContainer>
    </HeaderStyled>
  )
}

const HeaderStyled = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  z-index: 10;
  background-color: var(--c-green);
  box-shadow: 0px 0px 6px 3px rgba(0, 0, 0, 0.2);
  border-radius: 0 0 20px 20px;
  position: fixed;
  top: 0;
  width: 100%;
  height: 56px;
`

const CloseContainer = styled.div`
  text-decoration: none;
  color: var(--c-blue);
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

const Closeicon = styled(AiOutlineClose)`
  width: 25px;
  height: 25px;
`

const Checkicon = styled(AiOutlineCheck)`
  width: 26px;
  height: 26px;
`
const Counter = styled.p`
  font-size: 0.7rem;
  padding: 0;
  margin: 0;
  position: fixed;
  top: 30px;
  right: 18px;
`
const InputStyled = styled.input`
  width: 10ch;
  height: 25px;
  font-size: 1rem;
  border-radius: 15px;
  color: var(--c-blue);
  text-align: center;
  border: none;
  &:focus {
    width: 20ch;
  }
`
