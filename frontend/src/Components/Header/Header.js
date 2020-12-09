import { Avatar, Flex, Image } from '@chakra-ui/react'
import logoSmall from '../../assets/logo_sm.png'

export default function Header() {
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
        <Avatar size="sm" name="Oliver Morgenroth" />
      </Flex>
    </Flex>
  )
}
