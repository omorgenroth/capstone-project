import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import DishItem from '../Components/DishItem'
import PropTypes from 'prop-types'

SelectedDishesPage.propTypes = {
  dishes: PropTypes.array,
  onDeleteItem: PropTypes.func,
}

export default function SelectedDishesPage({ dishes, onDeleteItem }) {
  return (
    <Wrapper>
      <Header>
        <LinkStyled to="/home">X</LinkStyled>
        <p>Your selection</p>
      </Header>
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
//TODO make the Header a Component

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  z-index: 10;
  background-color: var(--c-white);
  box-shadow: 0px 0px 6px 3px rgba(0, 0, 0, 0.08);
  border-radius: 0 0 15px 15px;
  position: fixed;
  top: 0;
  width: 100%;
`
const LinkStyled = styled(Link)`
  text-decoration: none;
  color: var(--c-gray);
  font-size: 1rem;
  position: fixed;
  left: 20px;
`

const Grid = styled.div`
  display: grid;
  grid-gap: 10px;
  padding: 10px;
  grid-row: 2/3;
`
