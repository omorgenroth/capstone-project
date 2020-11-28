import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import DishItem from '../Components/DishItem'
import PropTypes from 'prop-types'
import HeaderOverlay from '../Components/HeaderOverlay'

SelectedDishesPage.propTypes = {
  dishes: PropTypes.array,
  onDeleteItem: PropTypes.func,
}

export default function SelectedDishesPage({ dishes, onDeleteItem }) {
  return (
    <Wrapper>
      <HeaderOverlay>Your selection</HeaderOverlay>
      <Grid>
        {dishes &&
          dishes.map(({ id, name, isSelected }) => {
            return (
              <DishItem
                key={id}
                id={id}
                title={name}
                isSelected={isSelected}
                onClick={deleteItem}
              />
            )
          })}
      </Grid>
    </Wrapper>
  )

  function deleteItem(id) {
    const newDishes = dishes.filter((dish) => {
      return dish.id !== id
    })
    onDeleteItem(newDishes)
  }
}

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 60px auto;
`

const Grid = styled.div`
  display: grid;
  grid-gap: 10px;
  padding: 10px;
  grid-row: 2/3;
`
