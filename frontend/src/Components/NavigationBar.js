import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'
import { FaArchive, FaClipboardList, FaHome } from 'react-icons/fa'

export default function NavigationBar({ route }) {
  return (
    <NavWrapper>
      <Home to="/home" route={route}>
        <FaHome route={route} />
      </Home>
      <List to="/lists/current" route={route}>
        <FaClipboardList />
      </List>
      <Archive to="/dishes" route={route}>
        <FaArchive />
      </Archive>
    </NavWrapper>
  )
}

const NavWrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 40px;
  box-shadow: 0px 0px 6px 3px rgba(0, 0, 0, 0.08);
  justify-content: space-evenly;
  align-items: center;
  position: fixed;
  bottom: 0;
  background-color: var(--c-green);
`

const Home = styled(Link)`
  svg {
    color: var(--c-blue);
    width: 25px;
    height: 25px;
    opacity: ${(props) => (props.route === 'home' ? '1' : '0.7')};
  }
`

const List = styled(Link)`
  svg {
    color: var(--c-blue);
    width: 22px;
    height: 22px;
    opacity: ${(props) => (props.route === 'current' ? '1' : '0.7')};
  }
`

const Archive = styled(Link)`
  svg {
    color: var(--c-blue);
    width: 22px;
    height: 22px;
    opacity: 0.7;
  }
`
