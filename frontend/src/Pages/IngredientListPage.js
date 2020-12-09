import styled from 'styled-components/macro'
import Header from '../Components/Header'
import IngredientListItem from '../Components/IngredientListItem/IngredientListItem'
import NavigationBar from '../Components/NavigationBar'
import { sortByName } from '../lib/lib'

export default function IngredientListPage({ currentList, onCheckItem }) {
  window.scroll(0, 0)

  const ingredients = currentList.items
  const categoriesWithDuplicates =
    ingredients &&
    ingredients.map((item) => {
      return { id: item.categoryId, name: item.category }
    })

  const categoriesUnique = categoriesWithDuplicates.reduce(
    (acc, currentElement) => {
      if (!acc.some((a) => a.id === currentElement.id)) {
        acc.push(currentElement)
      }
      return acc
    },
    []
  )

  const categories = sortByName(categoriesUnique)

  return (
    <PageWrapper>
      <Header />

      <ContentWrapper>
        <div>
          Liste:
          {currentList.name === '' ? 'Nr.' + currentList.id : currentList.name}
        </div>
        {categories &&
          categories.map((category) => {
            return (
              <CategoryContainer key={category.id}>
                {category.name}
                <Ruler />
                {ingredients.map((ingredient) => {
                  if (category.id === ingredient.categoryId) {
                    return (
                      <IngredientListItem
                        key={ingredient.id}
                        props={ingredient}
                        onClick={checkItem}
                      />
                    )
                  } else {
                    return <></>
                  }
                })}
              </CategoryContainer>
            )
          })}
      </ContentWrapper>
      <NavigationBar route="current" />
    </PageWrapper>
  )

  function checkItem(id) {
    const elIndex = ingredients.findIndex((el) => el.id === id)
    let newIngredients = [...ingredients]
    newIngredients[elIndex] = {
      ...newIngredients[elIndex],
      isSelected: !newIngredients[elIndex].isSelected,
    }
    console.log(newIngredients)
    onCheckItem(newIngredients)
  }
}

const PageWrapper = styled.div`
  display: grid;
  grid-template-rows: 60px auto 50px;
`
const ContentWrapper = styled.div`
  padding: 15px 20px 0 20px;
  grid-row: 2/3;
  min-width: 100%;
  min-height: 100vh;
`

const CategoryContainer = styled.div`
  font-size: 0.9rem;
  margin: 0 0 12px 5px;
  color: var(--c-blue);
`
const Ruler = styled.hr`
  border: 0.2px solid var(--c-green);
  width: 100%;
  margin: 2px 0 3px 0;
`
