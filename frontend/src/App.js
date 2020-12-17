import { useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import AppStateContext from './context/AppStateContext'
import UserContext from './context/UserContext'
import useDishes from './hooks/useDishes'
import useLists from './hooks/useLists'
import { addIsSelectedValue, sortByName } from './lib/lib'
import AddItemsPage from './domain/AddItems/AddItemsPage'
import DishesAllPage from './domain/Dishes/DishSelectionPage'
import HomePage from './pages/HomePage'
import LandingPage from './pages/LandingPage'
import LoginPage from './domain/Login/LoginPage'
import ShoppingListPage from './domain/ShoppingList/ShoppingListPage'
import ProtectedRoute from './ProtectedRoute'
import { saveList, updateList } from './services/fetchLists'

function App() {
  const [user, setUser] = useState()
  const [state, setState] = useState()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const { currentList, setCurrentList, updateCurrentList } = useLists()

  useEffect(() => {
    if (user !== undefined) {
      setIsAuthorized(true)
    }
  }, [user])

  const {
    allDishes,
    setAllDishes,
    selectedDishes,
    resetSelectedDishes,
  } = useDishes()

  const notifier = useToast()

  const history = useHistory()
  console.log(user)
  console.log(currentList)
  return (
    <div className="App">
      <AppStateContext.Provider value={{ state, setState }}>
        <UserContext.Provider
          value={{
            user,
            setUser,
            currentList,
            setCurrentList,
            updateCurrentList,
          }}>
          <Switch>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <ProtectedRoute path="/home" isAuthorized={isAuthorized}>
              <HomePage />
            </ProtectedRoute>
            <ProtectedRoute path="/dishes" isAuthorized={isAuthorized}>
              <DishesAllPage
                dishes={allDishes}
                onToggleItem={(newDishes) => setAllDishes(newDishes)}
                onCreate={(listName) => createIngredientList(listName)}
                onClose={() => resetSelectedDishes()}
              />
            </ProtectedRoute>
            <ProtectedRoute path="/lists/current" isAuthorized={isAuthorized}>
              <ShoppingListPage />
            </ProtectedRoute>
            <ProtectedRoute path="/addItems" isAuthorized={isAuthorized}>
              <AddItemsPage />
            </ProtectedRoute>
            <Route path="/login">
              <LoginPage />
            </Route>
          </Switch>
        </UserContext.Provider>
      </AppStateContext.Provider>
    </div>
  )

  function createIngredientList(listName) {
    let flatIngredients = []
    selectedDishes.forEach((dish) => {
      dish.ingredients.forEach((ingredient) => flatIngredients.push(ingredient))
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

    console.log(reducedIngredientList)
    const sortedIngredientList = sortByName(reducedIngredientList)

    const ingredientList = addIsSelectedValue(sortedIngredientList)
    const listObject = {
      name: listName ? listName : '',
      userId: user.id,
      items: ingredientList,
      active: true,
    }
    if (currentList) {
      updateList({ ...currentList, active: false }, currentList.id)
    }

    resetSelectedDishes()
    createList(listObject)
  }

  async function createList(list) {
    const savedList = await saveList(list)
    const listObject = savedList[savedList.length - 1]

    await setCurrentList(listObject)

    notifier({
      description: 'Created a List with the ID: ' + listObject.id,
      status: 'success',
      duration: 2000,
      isClosable: true,
    })

    history.push('/lists/current')
  }
}

export default App
