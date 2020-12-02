import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import HeaderOverlay from '../Components/HeaderOverlay/HeaderOverlay'
import DishListItem from '../Components/DishListItem/DishListItem'

SelectedDishesPage.propTypes = {
  dishes: PropTypes.array,
  onDeleteItem: PropTypes.func,
}

export default function SelectedDishesPage({
  selectedDishes,
  onDeleteItem,
  onCreate,
}) {
  return (
    <PageWrapper>
      <HeaderOverlay>Your selection</HeaderOverlay>
      <ContentWrapper>
        {selectedDishes &&
          selectedDishes.map(({ id, name }) => {
            return (
              <DishListItem
                key={id}
                id={id}
                title={name}
                onDelete={deleteItem}
              />
            )
          })}
      </ContentWrapper>
      <CreateButton onClick={onCreate} />
    </PageWrapper>
  )

  function deleteItem(id) {
    const updatedDishes = selectedDishes.filter((dish) => dish.id !== id)
    onDeleteItem(updatedDishes)
  }
}

const PageWrapper = styled.div`
  display: grid;
  grid-template-rows: 60px auto;
`

const ContentWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  padding: 10px;
  grid-row: 2/3;
`

const CreateButton = styled.button`
  border-radius: 50%;
  box-shadow: 0px 0px 6px 3px rgba(0, 0, 0, 0.08);
  width: 45px;
  height: 45px;
  z-index: 5;
  background-color: var(--c-orange);
  position: fixed;
  bottom: 60px;
  right: 20px;
  border: none;
`
