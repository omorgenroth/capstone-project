import { useEffect, useState } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import DishesAllPage from './Pages/DishesAllPage'
import HomePage from './Pages/HomePage'
import IngredientListPage from './Pages/IngredientListPage'
import LandingPage from './Pages/LandingPage'
import DishesSelectedPage from './Pages/DishesSelectedPage'
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
      <Switch>
        <Route exact path="/">
          <LandingPage loading={isLoading} />
        </Route>
        <Route path="/home">
          <HomePage />
        </Route>
        <Route path="/dishes/selected">
          <DishesSelectedPage
            selectedDishes={selectedDishes}
            onDeleteItem={(newSelectedDishes) =>
              setSelectedDishes(newSelectedDishes)
            }
            onCreate={createIngredientList}
          />
        </Route>
        <Route path="/dishes/all">
          <DishesAllPage
            dishes={allDishes}
            onToggleItem={(newDishes) => setAllDishes(newDishes)}
            error={error}
          />
        </Route>
        <Route path="/ingredients">
          <IngredientListPage ingredients={ingredients} />
        </Route>
      </Switch>
    </div>
  )

  function addIsSelectedValue(array) {
    return array.map((element) => ({ ...element, isSelected: false }))
  }

  function createIngredientList() {
    let flatIngredients = []
    selectedDishes.forEach((dish) => {
      let i
      for (i = 0; i < dish.ingredients.length; i++) {
        flatIngredients.push(dish.ingredients[i])
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
