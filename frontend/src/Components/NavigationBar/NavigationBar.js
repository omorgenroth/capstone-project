import { chakra, Flex } from '@chakra-ui/react'
import { FaArchive, FaClipboardList, FaHome } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

NavigationBar.propTypes = {
  route: PropTypes.string.isRequired,
}

export default function NavigationBar({ route }) {
  const NavLink = chakra(Link)
  const HomeIcon = chakra(FaHome)
  const ListIcon = chakra(FaClipboardList)
  const ArchiveIcon = chakra(FaArchive)

  return (
    <Flex
      align="center"
      justify="space-evenly"
      pos="fixed"
      bottom="0"
      h="40px"
      w="100%"
      bg="primaryGreen.500"
      boxShadow="lg">
      <NavLink
        to="/home"
        route={route}
        color="primaryBlue.500"
        opacity={route === 'home' ? '1' : '0.7'}>
        <HomeIcon boxSize="25px" />
      </NavLink>
      <NavLink
        to="/lists/current"
        route={route}
        color="primaryBlue.500"
        opacity={route === 'current' ? '1' : '0.7'}>
        <ListIcon boxSize="25px" />
      </NavLink>
      <NavLink
        to="/"
        route={route}
        color="primaryBlue.500"
        opacity={route === 'nope' ? '1' : '0.7'}>
        <ArchiveIcon boxSize="25px" />
      </NavLink>
    </Flex>
  )
}
