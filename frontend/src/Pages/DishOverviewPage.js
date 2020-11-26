import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import styled from 'styled-components/macro'
import DishItem from '../Components/DishItem'

export default function DishOverview({ dishes, onToggleItem }) {
  let counter = dishes.filter((dish) => {
    return dish.isSelected
  }).length

  return (
    <Wrapper>
      <Header>
        <LinkStyled to="/">X</LinkStyled>
        <p>Dish Overview</p>
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
                onSelect={handleToggle}
              />
            )
          })}
      </Grid>
      {counter === 0 ? (
        <></>
      ) : (
        <>
          <Counter>{counter}</Counter>
          <LinkOval to="/selected">
            <ArrowIcon />
          </LinkOval>
        </>
      )}
    </Wrapper>
  )

  function handleToggle(id) {
    const elIndex = dishes.findIndex((el) => el.id === id)
    let newDishes = [...dishes]
    newDishes[elIndex] = {
      ...newDishes[elIndex],
      isSelected: !newDishes[elIndex].isSelected,
    }
    onToggleItem(newDishes)
  }
}

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 60px auto;
`

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

const LinkOval = styled(Link)`
  border-radius: 50%;
  box-shadow: 0px 0px 6px 3px rgba(0, 0, 0, 0.08);
  width: 45px;
  height: 45px;
  z-index: 5;
  background-color: var(--c-white);
  position: fixed;
  bottom: 60px;
  right: 20px;
`

const ArrowIcon = styled(FaArrowRight)`
  color: var(--c-gray);
  transform: scale(1.5);
  z-index: 2;
  position: fixed;
  bottom: 73px;
  right: 33px;
`

const Counter = styled.div`
  width: 30px;
  height: 30px;
  background-color: var(--c-gray);
  color: var(--c-white);
  border-radius: 50%;
  bottom: 95px;
  right: 15px;
  z-index: 4;
  position: fixed;
  font-size: 0.9rem;
  display: grid;
  place-items: center;
  opacity: 0.6;
`
