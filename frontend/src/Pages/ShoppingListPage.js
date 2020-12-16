import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Grid,
  Heading,
} from '@chakra-ui/react'
import Header from '../components/Header/Header'
import IngredientListItem from '../components/IngredientListItem/IngredientListItem'
import NavigationBar from '../components/NavigationBar/NavigationBar'
import { sortByName } from '../lib/lib'
import PropTypes from 'prop-types'
import FloatingButton from '../components/FloatingButton/FloatingButton'
import { useHistory } from 'react-router-dom'
import { useContext } from 'react'
import UserContext from '../context/UserContext'

ShoppingListPage.propTypes = {
  currentList: PropTypes.object.isRequired,
  onCheckItem: PropTypes.func.isRequired,
}

export default function ShoppingListPage() {
  const { currentList, updateCurrentList } = useContext(UserContext)
  const history = useHistory()
  const ingredients = currentList.items
  const categoriesWithDuplicates =
    ingredients &&
    ingredients.map((item) => {
      return { id: item.categoryId, name: item.category }
    })
  const categoriesUnique = categoriesWithDuplicates.reduce(
    (acc, currentElement) => {
      if (!acc.some((a) => a.id === currentElement.id)) {
        acc.push(currentElement)
      }
      return acc
    },
    []
  )

  const categories = sortByName(categoriesUnique)

  return (
    <Grid templateRows="60px auto 50px">
      <Header />

      <Box p="15px 20px 0 20px" w="100%" h="100%" gridRow="2/3">
        <Heading fontSize="sm" textAlign="center" mb="10px">
          {currentList.name === ''
            ? 'Liste Nr. ' + currentList.id
            : ' ' + currentList.name}
        </Heading>
        <Accordion
          colorScheme="teal"
          allowMultiple
          defaultIndex={[0, 1, 2, 3, 4, 5, 6, 7, 8]}>
          {categories &&
            categories.map((category) => {
              return (
                <AccordionItem key={category.id}>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      {category.name}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    {ingredients.map((ingredient) => {
                      if (category.id === ingredient.categoryId) {
                        return (
                          <IngredientListItem
                            key={ingredient.id}
                            props={ingredient}
                            onClick={checkItem}
                          />
                        )
                      }
                    })}
                  </AccordionPanel>
                </AccordionItem>
              )
            })}
        </Accordion>
      </Box>
      <FloatingButton onClick={() => history.push('/addItems')} />
      <NavigationBar route="current" />
    </Grid>
  )

  function checkItem(id) {
    const elIndex = ingredients.findIndex((el) => el.id === id)
    let newIngredients = [...ingredients]
    newIngredients[elIndex] = {
      ...newIngredients[elIndex],
      isSelected: !newIngredients[elIndex].isSelected,
    }
    console.log(newIngredients)
    updateCurrentList(newIngredients)
  }
}
