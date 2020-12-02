import styled from 'styled-components/macro'
import HeaderOverlay from '../Components/HeaderOverlay/HeaderOverlay'
import IngredientListItem from '../Components/IngredientListItem/IngredientListItem'

export default function IngredientListPage({ ingredients, onCheckItem }) {
  const categoriesWithDuplicates = ingredients.map((item) => {
    return { categoryId: item.categoryId, categoryName: item.category }
  })

  const categories = categoriesWithDuplicates.reduce((acc, currentElement) => {
    if (!acc.some((a) => a.categoryId === currentElement.categoryId)) {
      acc.push(currentElement)
    }
    return acc
  }, [])

  return (
    <PageWrapper>
      <HeaderOverlay />
      <ContentWrapper>
        {categories &&
          categories.map((category) => {
            return (
              <CategoryContainer key={category.categoryId}>
                {category.categoryName}
                <Ruler />
                {ingredients.map((ingredient) => {
                  if (category.categoryId === ingredient.categoryId) {
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
    </PageWrapper>
  )

  function checkItem(id) {
    const elIndex = ingredients.findIndex((el) => el.id === id)
    let newIngredients = [...ingredients]
    newIngredients[elIndex] = {
      ...newIngredients[elIndex],
      isSelected: !newIngredients[elIndex].isSelected,
    }
    onCheckItem(newIngredients)
  }
}

const PageWrapper = styled.div`
  display: grid;
  grid-template-rows: 60px auto;
`
const ContentWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  padding: 15px 20px 0 20px;
  grid-row: 2/3;
  min-width: 100%;
`

const CategoryContainer = styled.div`
  font-size: 1rem;
  margin: 0 0 5px 5px;
  color: var(--c-gray);
`
const Ruler = styled.hr`
  border: 0.2px solid var(--c-green);
  width: 100%;
`
