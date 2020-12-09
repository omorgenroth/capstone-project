import { useEffect, useState } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import DishesAllPage from './Pages/DishesAllPage'
import HomePage from './Pages/HomePage'
import IngredientListPage from './Pages/IngredientListPage'
import LandingPage from './Pages/LandingPage'
import { saveList } from './services/fetchLists'
import { getUserLists } from './services/fetchUsers'
import { getAllDishes } from './services/fetchDishes'
import { sortByName } from './lib/lib'

function App() {
  const defaultUser = [
    {
      id: 5,
      firstname: '1',
      lastname: 'Skywalker',
      email: 'leia@skywalker.com',
    },
  ]
  // TODO States aufräumen

  // Auf OverlaySeite verschieben? selectedDishes vllt. auflösen?
  const [allDishes, setAllDishes] = useState([])
  const [selectedDishes, setSelectedDishes] = useState([])

  // löschen - alles über userList lösen
  const [ingredients, setIngredients] = useState([])

  //Custom Hook?
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  //Context API
  const [user, setUser] = useState(defaultUser)

  // currentList vllt. auch auflösen?
  const [currentList, setCurrentList] = useState({})
  const [userLists, setUserLists] = useState([])

  const history = useHistory()

  useEffect(() => {
    getAllDishes()
      .then((data) =>
        data.error ? setError(true) : setAllDishes(addIsSelectedValue(data))
      )
      .then(() => setLoading(false))

    getUserLists(user[0].id)
      .then((data) => (data.error ? setError(true) : setUserLists(data)))
      .then(() => setLoading(false))
  }, [])

  useEffect(() => {
    setSelectedDishes(allDishes.filter((dish) => dish.isSelected))
  }, [allDishes])

  useEffect(() => {
    const currentItem = userLists[userLists.length - 1]
    setCurrentList(currentItem)
  }, [userLists])

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <LandingPage loading={isLoading} error={error} />
        </Route>
        <Route path="/home">
          <HomePage userLists={userLists} currentList={currentList} />
        </Route>
        <Route path="/dishes">
          <DishesAllPage
            dishes={allDishes}
            onToggleItem={(newDishes) => setAllDishes(newDishes)}
            onCreate={(listName) => createIngredientList(listName)}
            onClose={() => resetSelectedDishes()}
          />
        </Route>
        <Route path="/lists/current">
          <IngredientListPage
            currentList={currentList}
            onCheckItem={(updatedIngredients) => updateList(updatedIngredients)}
          />
        </Route>
      </Switch>
    </div>
  )

  function updateList(updatedIngredients) {
    setCurrentList({ ...currentList, items: updatedIngredients })
    const listObject = {
      name: currentList.name,
      userId: currentList.id,
      items: updatedIngredients,
    }
  }

  function addIsSelectedValue(array) {
    return array.map((element) => ({ ...element, isSelected: false }))
  }

  function resetSelectedDishes() {
    setAllDishes(addIsSelectedValue(allDishes))
  }

  function createIngredientList(listName) {
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
    const sortedIngredientList = sortByName(reducedIngredientList)

    const ingredientList = addIsSelectedValue(sortedIngredientList)
    const listObject = {
      name: listName ? listName : '',
      userId: user[0].id,
      items: ingredientList,
    }
    resetSelectedDishes()
    saveList(listObject).then((listItem) =>
      setUserLists([...userLists, listItem[listItem.length - 1]])
    )
  }
}

export default App
