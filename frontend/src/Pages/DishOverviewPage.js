import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import DishItem from '../Components/DishItem'

export default function DishOverview({ dishes, onToggleItem }) {
  return (
    <Wrapper>
      <Header>
        <LinkStyled to="/">X</LinkStyled>
        <p>Dish Overview</p>
      </Header>
      <Grid>
        {dishes &&
          dishes.map(({ id, name, isChecked }) => {
            return (
              <DishItem
                key={id}
                id={id}
                title={name}
                isChecked={isChecked}
                onSelect={handleToggle}
              />
            )
          })}
      </Grid>
    </Wrapper>
  )

  function handleToggle(id) {
    const elIndex = dishes.findIndex((el) => el.id === id)
    let newDishes = [...dishes]
    newDishes[elIndex] = {
      ...newDishes[elIndex],
      isChecked: !newDishes[elIndex].isChecked,
    }
    onToggleItem(newDishes)
  }
}

const Wrapper = styled.div``

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  z-index: 10;
  background-color: var(--c-white);
  border-radius: 0 0 15px 15px;
  position: sticky;
  top: 0;
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
`
