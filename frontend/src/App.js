import { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import DishOverviewPage from './Pages/DishOverviewPage'
import LandingPage from './Pages/LandingPage'
import getAllDishes from './services/getAllDishes'

function App() {
  const [dishes, setDishes] = useState([])

  useEffect(() => {
    getAllDishes().then((data) => setDishes(addisSelectedValue(data)))
  }, [])

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
      </Switch>
    </div>
  )

  function addisSelectedValue(data) {
    return data.map((item) => ({ ...item, isSelected: false }))
  }
}

export default App
