import { AddIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'
import PropTypes from 'prop-types'

FloatingButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default function FloatingButton({ onClick }) {
  return (
    <>
      <IconButton
        onClick={onClick}
        pos="fixed"
        bottom="80px"
        right="30px"
        bg="primaryGreen.500"
        borderRadius="50px"
        color="primaryBlue.500"
        boxShadow="sm"
        icon={<AddIcon />}
      />
    </>
  )
}
