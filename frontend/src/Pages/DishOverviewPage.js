import { Link } from 'react-router-dom'
import { FaChevronRight, FaCheck } from 'react-icons/fa'
import styled from 'styled-components/macro'
import DishItem from '../Components/DishItem'
import PropTypes from 'prop-types'

DishOverview.propTypes = {
  dishes: PropTypes.array,
  onToggleItem: PropTypes.func,
}

export default function DishOverview({ dishes, onToggleItem }) {
  let counter = dishes.filter((dish) => {
    return dish.isSelected
  }).length

  return (
    <Wrapper>
      <Header>
        <LinkStyled to="/home">X</LinkStyled>
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
                onClick={handleToggle}
              />
            )
          })}
      </Grid>
      {counter === 0 ? (
        <></>
      ) : (
        <>
          <LinkOval to="/dishes/selected">
            <Counter>{counter}</Counter>
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
//TODO make the Header a Component

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  z-index: 10;
  background-color: var(--c-green);
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
  grid-gap: 15px;
  padding: 20px;
  grid-row: 2/3;
`

const LinkOval = styled(Link)`
  border-radius: 50%;
  box-shadow: 0px 0px 6px 3px rgba(0, 0, 0, 0.08);
  width: 45px;
  height: 45px;
  z-index: 5;
  background-color: #ff6e4a;
  position: fixed;
  bottom: 60px;
  right: 20px;
`

const CheckIcon = styled(FaCheck)`
  color: var(--c-white);
  transform: scale(1);
  z-index: 8;
  position: fixed;
  bottom: 73px;
  right: 33px;
`

const Counter = styled.div`
  width: 30px;
  height: 30px;
  color: var(--c-white);
  border-radius: 50%;
  z-index: 7;
  font-size: 1rem;
  display: grid;
  place-items: center;
  position: fixed;
  bottom: 67px;
  right: 27px;
`
