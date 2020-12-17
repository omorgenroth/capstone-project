import {
  Avatar,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import logoSmall from '../../assets/logo_sm.png'
import UserContext from '../../context/UserContext'

export default function Header() {
  const { user } = useContext(UserContext)
  const history = useHistory()

  return (
    <Flex
      pos="fixed"
      top="0"
      align="center"
      justify="space-evenly"
      bg="primaryGreen.500"
      w="100%"
      h="56px"
      boxShadow="md"
      zIndex="10">
      <Image src={logoSmall} boxSize="45px" />
      <Flex pos="fixed" top="12px" right="26px">
        <Menu width="20px" placement="auto">
          <MenuButton>
            <Avatar size="sm" name={user.firstname + ' ' + user.lastname} />
          </MenuButton>
          <MenuList>
            <MenuItem bg="teal" fontSize="0.7rem" onClick={logoutUser}>
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  )

  function logoutUser() {
    localStorage.removeItem('userData')
    history.push('/login')
  }
}
