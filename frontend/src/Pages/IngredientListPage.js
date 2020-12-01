import styled from 'styled-components/macro'
import IngredientListItem from '../Components/IngredientListItem/IngredientListItem'

export default function IngredientListPage({ ingredients }) {
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
    <>
      {categories &&
        categories.map((category) => {
          return (
            <CategoryContainer key={category.categoryId}>
              {category.categoryName}
              <hr />
              {ingredients.map((ingredient) => {
                if (category.categoryId === ingredient.categoryId) {
                  return (
                    <IngredientListItem
                      key={ingredient.id}
                      props={ingredient}
                      isChecked={false}
                    />
                  )
                } else {
                  return <></>
                }
              })}
            </CategoryContainer>
          )
        })}
    </>
  )
}

const CategoryContainer = styled.div`
  font-size: 1rem;
  margin: 15px 0 5px 5px;
`

const IngredientItem = styled.div`
  font-size: 0.7rem;
`
