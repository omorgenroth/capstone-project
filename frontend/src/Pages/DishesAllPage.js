import PropTypes from 'prop-types'
import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import DishItem from '../Components/DishItem/DishItem'
import HeaderOverlay from '../Components/HeaderOverlay/HeaderOverlay'
import { sortByName } from '../lib/lib'

DishOverview.propTypes = {
  dishes: PropTypes.array,
  onToggleItem: PropTypes.func,
  error: PropTypes.bool,
}

export default function DishOverview({
  dishes,
  onToggleItem,
  onCreate,
  onClose,
}) {
  const [listName, setListName] = useState()

  let counter = dishes.filter((dish) => {
    return dish.isSelected
  }).length

  const sortedDishes = sortByName(dishes)

  const history = useHistory()

  return (
    <PageWrapper>
      <HeaderOverlay
        onClose={handleClose}
        onCreate={handleCreate}
        counter={counter}
        listName={listName}
        setName={(name) => setListName(name)}>
        Dish Overview
      </HeaderOverlay>
      <ContentWrapper>
        {sortedDishes &&
          sortedDishes.map(({ id, name, isSelected }) => {
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
    </PageWrapper>
  )

  function handleToggle(id) {
    const elIndex = dishes.findIndex((el) => el.id === id)
    let updatedDishes = [...dishes]
    updatedDishes[elIndex] = {
      ...updatedDishes[elIndex],
      isSelected: !updatedDishes[elIndex].isSelected,
    }
    onToggleItem(updatedDishes)
  }

  function handleClose() {
    onClose()
    history.push('/home')
  }

  function handleCreate() {
    onCreate(listName)
    history.push('/lists/current')
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
