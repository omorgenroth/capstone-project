import { useEffect, useState } from 'react'
import { Route, useHistory } from 'react-router-dom'
import DishOverviewPage from './Pages/DishOverviewPage'
import HomePage from './Pages/HomePage'
import IngredientListPage from './Pages/IngredientListPage'
import LandingPage from './Pages/LandingPage'
import SelectedDishesPage from './Pages/SelectedDishesPage'
import getAllDishes from './services/getAllDishes'

function App() {
  const [allDishes, setAllDishes] = useState([])
  const [selectedDishes, setSelectedDishes] = useState([])
  const [ingredients, setIngredients] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const history = useHistory()

  useEffect(() => {
    getAllDishes()
      .then((data) =>
        data.error ? setError(true) : setAllDishes(addIsSelectedValue(data))
      )
      .then(() => setLoading(false))
  }, [])

  useEffect(() => {
    setSelectedDishes(allDishes.filter((dish) => dish.isSelected))
  }, [allDishes])

  return (
    <div className="App">
      <Route exact path="/">
        <LandingPage loading={isLoading} />
      </Route>
      <Route path="/home">
        <HomePage />
      </Route>
      <Route exact path="/dishes/selected">
        <SelectedDishesPage
          selectedDishes={selectedDishes}
          onDeleteItem={(newSelectedDishes) =>
            setSelectedDishes(newSelectedDishes)
          }
          onCreate={createIngredientList}
        />
      </Route>
      <Route exact path="/dishes/all">
        <DishOverviewPage
          dishes={allDishes}
          onToggleItem={(newDishes) => setAllDishes(newDishes)}
          error={error}
        />
      </Route>
      <Route exact path="/ingredients">
        <IngredientListPage ingredients={ingredients} />
      </Route>
    </div>
  )

  function addIsSelectedValue(array) {
    return array.map((element) => ({ ...element, isSelected: false }))
  }

  function createIngredientList() {
    const selectedIngredients = selectedDishes.map((dish) => {
      return dish.dishIngredients
    })

    let flatIngredients = []
    selectedIngredients.forEach((ingredient) => {
      let i
      for (i = 0; i < ingredient.length; i++) {
        flatIngredients.push({
          id: ingredient[i].Ingredient.id,
          name: ingredient[i].Ingredient.name,
          quantity: ingredient[i].quantity,
          unit: ingredient[i].Ingredient.unit,
          categoryId: ingredient[i].Ingredient.category.id,
          category: ingredient[i].Ingredient.category.name,
        })
      }
    })

    const reducedIngredientList = flatIngredients.reduce(
      (list, currentElement) => {
        if (list.some((a) => a.id === currentElement.id)) {
          let existingItem = list.find((el) => el.id === currentElement.id)
          const newQuantity = existingItem.quantity + currentElement.quantity
          let newList = list.filter((item) => item.id !== currentElement.id)
          existingItem = { ...existingItem, quantity: newQuantity }
          newList = [...newList, existingItem]
          list = newList
        } else {
          list.push(currentElement)
        }
        return list
      },
      []
    )

    setIngredients(reducedIngredientList)
    history.push('/ingredients')
  }
}

export default App
