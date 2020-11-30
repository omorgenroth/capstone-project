import { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import DishOverviewPage from './Pages/DishOverviewPage'
import HomePage from './Pages/HomePage'
import LandingPage from './Pages/LandingPage'
import SelectedDishesPage from './Pages/SelectedDishesPage'
import getAllDishes from './services/getAllDishes'

function App() {
  const [dishes, setDishes] = useState([])
  const [selectedDishes, setSelectedDishes] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    getAllDishes()
      .then((data) =>
        data.error ? setError(true) : setDishes(addIsSelectedValue(data))
      )
      .then(() => setLoading(false))
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
      <Route exact path="/">
        <LandingPage loading={isLoading} />
      </Route>
      <Route path="/home">
        <HomePage />
      </Route>
      <Route exact path="/dishes/selected">
        <SelectedDishesPage
          dishes={selectedDishes}
          onDeleteItem={(newSelectedDishes) =>
            setSelectedDishes(newSelectedDishes)
          }
        />
      </Route>
      <Route exact path="/dishes">
        <DishOverviewPage
          dishes={dishes}
          onToggleItem={(newDishes) => setDishes(newDishes)}
          error={error}
        />
      </Route>
    </div>
  )

  function addIsSelectedValue(array) {
    return array.map((element) => ({ ...element, isSelected: false }))
  }
}

export default App
