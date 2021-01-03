import {
  Box,
  chakra,
  Container,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'
import { Search2Icon } from '@chakra-ui/icons'

AddItemHeader.propTypes = {
  counter: PropTypes.number,
  onClose: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  loading: PropTypes.bool,
}

export default function AddItemHeader({
  counter,
  onClose,
  onCreate,
  inputValue,
  setInputValue,
  loading,
}) {
  const CloseIcon = chakra(AiOutlineClose)
  const CheckIcon = chakra(AiOutlineCheck)

  return (
    <Flex
      align="center"
      justify="space-between"
      bg="primaryGreen.500"
      pos="fixed"
      top="0"
      w="100%"
      h="56px"
      borderRadius="0 0 20px 20px"
      boxShadow="md"
      zIndex="10">
      <Container onClick={onClose} color="primaryBlue.500">
        <CloseIcon boxSize="22px" />
      </Container>
      <Container>
        <InputGroup pos="relative">
          <InputLeftElement opacity="0.6">
            <Search2Icon pos="fixed" top="20px" />
          </InputLeftElement>
          <Input
            fontSize="0.9rem"
            id="searchvalue"
            placeholder="Starte eine Suche"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            textAlign="left"
            bg="white"
            color="primaryBlue.500"
            w="25ch"
            h="25px"
          />
        </InputGroup>
      </Container>
      <Container onClick={onCreate} color="primaryBlue.500" ml="20px">
        {loading ? (
          <Spinner />
        ) : counter !== 0 ? (
          <>
            <CheckIcon boxSize="22px" />
            <Box fontSize="xs" pos="fixed" top="27px" right="22px">
              {counter}
            </Box>
          </>
        ) : (
          <></>
        )}
      </Container>
    </Flex>
  )
}
