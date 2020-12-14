import { useToast } from '@chakra-ui/react'
import { useState } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import useDishes from './hooks/useDishes'
import useLists from './hooks/useLists'
import { addIsSelectedValue, sortByName } from './lib/lib'
import AddItemsPage from './pages/AddItemsPage'
import DishesAllPage from './pages/DishesAllPage'
import HomePage from './pages/HomePage'
import LandingPage from './pages/LandingPage'
import ShoppingListPage from './pages/ShoppingListPage'
import { saveList, updateList } from './services/fetchLists'

function App() {
  const user = {
    id: 10,
    firstname: 'Oliver',
    lastname: 'Morgenroth',
    email: 'o@morgenroth.com',
  }

  const {
    currentList,
    setCurrentList,
    userLists,
    setUserLists,
    updateCurrentList,
    isLoadingLists,
  } = useLists({
    userId: user.id,
  })
  console.log(currentList)
  const {
    allDishes,
    setAllDishes,
    selectedDishes,
    resetSelectedDishes,
  } = useDishes()

  const notifier = useToast()

  const history = useHistory()

  console.log(currentList)
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <LandingPage loading={isLoadingLists} />
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
        <Route path="/addItems">
          <AddItemsPage currentList={currentList} />
        </Route>
      </Switch>
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
    updateList({ ...currentList, active: false }, currentList.id)
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
