import { chakra, Flex, Grid } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { FaCheckCircle, FaRegCircle } from 'react-icons/fa'

IngredientListItem.propTypes = {
  props: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default function IngredientListItem({ props, onClick }) {
  const CheckedIcon = chakra(FaCheckCircle)
  const UncheckedIcon = chakra(FaRegCircle)
  return (
    <Grid
      checked={props.isSelected}
      templateColumns="25px auto"
      textDecoration={props.isSelected ? 'line-through' : 'none'}
      color={props.isSelected ? 'lightgray' : 'primaryBlue.500'}
      fontSize="0.85rem">
      <Flex onClick={() => onClick(props.id)} align="center">
        {props.isSelected ? (
          <CheckedIcon data-testid="checked" transform="scale(1)" />
        ) : (
          <UncheckedIcon data-testid="unchecked" transform="scale(1)" />
        )}
      </Flex>
      <Flex align="center">
        {props.name}
        {props.quantity !== 0
          ? '  ( ' + props.quantity + ' ' + props.unit + ' )'
          : ''}
      </Flex>
    </Grid>
  )
}
