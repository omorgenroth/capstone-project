import { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import DishOverviewPage from './Pages/DishOverviewPage'
import LandingPage from './Pages/LandingPage'
import SelectedDishesPage from './Pages/SelectedDishesPage'
import getAllDishes from './services/getAllDishes'

function App() {
  const [dishes, setDishes] = useState([])
  const [selectedDishes, setSelectedDishes] = useState([])

  useEffect(() => {
    getAllDishes().then((data) => setDishes(addIsSelectedValue(data)))
  }, [])

  useEffect(() => {
    setSelectedDishes(
      dishes.filter((dish) => {
        return dish.isSelected
      })
    )
  }, [dishes])

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route path="/dishes">
          <DishOverviewPage
            dishes={dishes}
            onToggleItem={(newDishes) => setDishes(newDishes)}
          />
        </Route>
        <Route path="/selected">
          <SelectedDishesPage
            dishes={selectedDishes}
            onDeleteItem={(newSelectedDishes) =>
              setSelectedDishes(newSelectedDishes)
            }
          />
        </Route>
      </Switch>
    </div>
  )

  function addIsSelectedValue(data) {
    return data.map((item) => ({ ...item, isSelected: false }))
  }
}

export default App
