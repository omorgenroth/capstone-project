import LandingPage from './Pages/LandingPage'
import getAllDishes from './services/getAllDishes'
import { useEffect, useState } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import DishOverview from './Pages/DishOverview'

function App() {
  const [dishes, setDishes] = useState([])
  let history = useHistory()

  useEffect(() => {
    getAllDishes().then((data) => setDishes(addIsCheckedValue(data)))
  }, [])

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <LandingPage onClickStart={showDishesOverview} />
        </Route>
        <Route path="/dishes">
          <DishOverview dishes={dishes} />
        </Route>
      </Switch>
    </div>
  )

  function addIsCheckedValue(data) {
    return data.map((o) => ({ ...o, isChecked: false }))
  }

  function showDishesOverview() {
    history.push('/dishes')
  }
}

export default App
