import { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import DishOverviewPage from './Pages/DishOverviewPage'
import LandingPage from './Pages/LandingPage'
import HomePage from './Pages/HomePage'
import SelectedDishesPage from './Pages/SelectedDishesPage'
import getAllDishes from './services/getAllDishes'

function App() {
  const [dishes, setDishes] = useState([])
  const [selectedDishes, setSelectedDishes] = useState([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    getAllDishes()
      .then((data) => setDishes(addIsSelectedValue(data)))
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
        />
      </Route>
    </div>
  )

  function addIsSelectedValue(data) {
    return data.map((item) => ({ ...item, isSelected: false }))
  }
}

export default App
