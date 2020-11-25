import LandingPage from './Pages/LandingPage'
import DishItem from './Components/DishItem'
import getAllDishes from './services/getAllDishes'
import { useEffect, useState } from 'react'
import DishOverview from './Pages/DishOverview'

function App() {
  const [fetchedData, setFetchedData] = useState([])
  const [dishes, setDishes] = useState([])

  useEffect(() => {
    getAllDishes().then((data) => setFetchedData(data))
  }, [])

  function addIsCheckedValue(data) {
    return data.map((o) => ({ ...o, isChecked: false }))
  }

  function showDishesOverview() {
    setDishes(addIsCheckedValue(fetchedData))
  }

  return (
    <div className="App">
      <DishOverview dishes={dishes} />

      <LandingPage onClickStart={showDishesOverview} />
    </div>
  )
}

export default App
