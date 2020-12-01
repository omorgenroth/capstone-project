import Accordion from '../Components/Accordion/Accordion'

export default function IngredientListPage({ ingredients }) {
  const results = ingredients.map((item) => {
    return { categoryId: item.categoryId, categoryName: item.category }
  })

  const categories = results.reduce((acc, currentElement) => {
    if (!acc.some((a) => a.categoryId === currentElement.categoryId)) {
      console.log('NotFound: ', currentElement)
      acc.push(currentElement)
    } else {
      console.log('Found: ', currentElement)
    }
    return acc
  }, [])

  return (
    <>
      {categories &&
        categories.map((category) => {
          return (
            <Accordion
              key={category.categoryId}
              title={category.categoryName}
              content="Hier drin sind dann alle Items"
            />
          )
        })}
    </>
  )
}
