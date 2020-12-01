import Accordion from '../Components/Accordion/Accordion'

export default function IngredientListPage({ ingredients }) {
  console.log(ingredients)

  const results = ingredients.map((item) => {
    return { categoryId: item.categoryId, categoryName: item.category }
  })
  console.log(results)

  const categories = results.reduce((acc, currentElement) => {
    if (acc.some((a) => a.categoryId === currentElement.categoryId)) {
      acc.push(currentElement)
    }

    return acc
  }, [])

  console.log(categories)

  return (
    <>
      <Accordion title="Moin" content="Hier drin sind dann alle Items" />
    </>
  )
}
