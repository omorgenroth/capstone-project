import { useToast } from '@chakra-ui/react'
import { useState } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import useDishes from './hooks/useDishes'
import useLists from './hooks/useLists'
import { addIsSelectedValue, sortByName } from './lib/lib'
import DishesAllPage from './pages/DishesAllPage'
import HomePage from './pages/HomePage'
import LandingPage from './pages/LandingPage'
import ShoppingListPage from './pages/ShoppingListPage'
import { saveList } from './services/fetchLists'

function App() {
  const defaultUser = [
    {
      id: 5,
      firstname: '1',
      lastname: 'Skywalker',
      email: 'leia@skywalker.com',
    },
  ]

  const [user, setUser] = useState(defaultUser)

  const {
    allDishes,
    setAllDishes,
    selectedDishes,
    resetSelectedDishes,
  } = useDishes()

  const {
    currentList,
    setCurrentList,
    userLists,
    setUserLists,
    updateCurrentList,
  } = useLists({
    userId: user[0].id,
  })

  const notifier = useToast()
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const history = useHistory()

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
          <HomePage currentList={currentList} />
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
          <ShoppingListPage
            currentList={currentList}
            onCheckItem={(updatedItems) => updateCurrentList(updatedItems)}
          />
        </Route>
      </Switch>
    </div>
  )

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
    createList(listObject)
  }

  async function createList(list) {
    const savedList = await saveList(list)
    setUserLists([...userLists, savedList[savedList.length - 1]])

    notifier({
      description:
        'Created a List with the ID: ' + savedList[savedList.length - 1].id,
      status: 'success',
      duration: 2000,
      isClosable: true,
    })

    history.push('/lists/current')
  }
}

export default App
