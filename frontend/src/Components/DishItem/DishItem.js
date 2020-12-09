import { Flex, Grid, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { FaCheckCircle, FaRegCircle } from 'react-icons/fa'

DishItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func,
}

export default function DishItem({ id, title, isSelected, onClick }) {
  return (
    <Grid
      onClick={() => onClick(id)}
      selected={isSelected}
      templateColumns="5fr 1fr"
      w="100%"
      h="60px"
      bg={isSelected ? 'primaryGreen.500' : 'white'}
      boxShadow="base"
      borderRadius="10px"
      p="4px">
      <Flex align="center" gridColumn="1/2">
        <Text>{title}</Text>
      </Flex>
      <Flex gridColumn="2/3" align="center">
        {isSelected ? (
          <FaCheckCircle data-testid="checked" />
        ) : (
          <FaRegCircle data-testid="unchecked" />
        )}
      </Flex>
    </Grid>
  )
}
