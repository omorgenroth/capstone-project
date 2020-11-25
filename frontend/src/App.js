import { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import DishOverviewPage from './Pages/DishOverviewPage'
import LandingPage from './Pages/LandingPage'
import getAllDishes from './services/getAllDishes'

function App() {
  const [dishes, setDishes] = useState([])

  useEffect(() => {
    getAllDishes().then((data) => setDishes(addIsCheckedValue(data)))
  }, [])

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route path="/dishes">
          <DishOverviewPage dishes={dishes} />
        </Route>
      </Switch>
    </div>
  )

  function addIsCheckedValue(data) {
    return data.map((o) => ({ ...o, isChecked: false }))
  }
}

export default App
