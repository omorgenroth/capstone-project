import { Grid, Skeleton } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import DishItem from './DishItem/DishItem'
import DishSelectionHeader from './DishSelectionHeader/DishSelectionHeader'
import { sortByName } from '../../lib/lib'

DishOverview.propTypes = {
  dishes: PropTypes.array,
  onToggleItem: PropTypes.func,
  error: PropTypes.bool,
}

export default function DishOverview({
  dishes,
  onToggleItem,
  onCreate,
  onClose,
}) {
  const [listName, setListName] = useState('')

  let counter = dishes.filter((dish) => {
    return dish.isSelected
  }).length

  const sortedDishes = sortByName(dishes)
  const history = useHistory()
  const [isLoading, setLoading] = useState(false)

  return (
    <Grid rows="60px auto">
      <DishSelectionHeader
        onClose={handleClose}
        onCreate={handleCreate}
        counter={counter}
        listName={listName}
        setName={(name) => setListName(name)}
        loading={isLoading}
      />
      <Skeleton isLoaded={!isLoading} height="100vh">
        <Grid gap="15px" p="20px" mt="65px" row="2/3">
          {sortedDishes &&
            sortedDishes.map(({ id, name, isSelected }) => {
              return (
                <DishItem
                  key={id}
                  id={id}
                  title={name}
                  isSelected={isSelected}
                  onClick={handleToggle}
                />
              )
            })}
        </Grid>
      </Skeleton>
    </Grid>
  )

  function handleToggle(id) {
    const elIndex = dishes.findIndex((el) => el.id === id)
    let updatedDishes = [...dishes]
    updatedDishes[elIndex] = {
      ...updatedDishes[elIndex],
      isSelected: !updatedDishes[elIndex].isSelected,
    }
    onToggleItem(updatedDishes)
  }

  function handleClose() {
    onClose()
    history.push('/home')
  }

  function handleCreate() {
    setLoading(true)
    onCreate(listName)
  }
}
