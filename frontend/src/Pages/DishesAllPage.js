import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import DishItem from '../Components/DishItem/DishItem'
import HeaderOverlay from '../Components/HeaderOverlay/HeaderOverlay'

DishOverview.propTypes = {
  dishes: PropTypes.array,
  onToggleItem: PropTypes.func,
  error: PropTypes.bool,
}

export default function DishOverview({ dishes, onToggleItem, error }) {
  let counter = dishes.filter((dish) => {
    return dish.isSelected
  }).length

  return (
    <PageWrapper>
      <HeaderOverlay>Dish Overview</HeaderOverlay>
      <ContentWrapper>
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
      </ContentWrapper>
      {counter === 0 ? (
        <></>
      ) : (
        <>
          <LinkButton to="/dishes/selected">
            <Counter>{counter}</Counter>
          </LinkButton>
        </>
      )}
    </PageWrapper>
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

const PageWrapper = styled.div`
  display: grid;
  grid-template-rows: 60px auto;
`

const ContentWrapper = styled.div`
  display: grid;
  grid-gap: 15px;
  padding: 20px;
  grid-row: 2/3;
`

const LinkButton = styled(Link)`
  border-radius: 50%;
  box-shadow: 0px 0px 6px 3px rgba(0, 0, 0, 0.08);
  width: 45px;
  height: 45px;
  z-index: 5;
  background-color: var(--c-orange);
  position: fixed;
  bottom: 60px;
  right: 20px;
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
