import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import HeaderOverlay from '../Components/HeaderOverlay/HeaderOverlay'
import ListItem from '../Components/ListItem/ListItem'

SelectedDishesPage.propTypes = {
  dishes: PropTypes.array,
  onDeleteItem: PropTypes.func,
}

export default function SelectedDishesPage({ selectedDishes, onDeleteItem }) {
  return (
    <PageWrapper>
      <HeaderOverlay>Your selection</HeaderOverlay>
      <ContentWrapper>
        {selectedDishes &&
          selectedDishes.map(({ id, name }) => {
            return (
              <ListItem key={id} id={id} title={name} onDelete={deleteItem} />
            )
          })}
      </ContentWrapper>
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
