import { useEffect, useState } from 'react'
import { addIsSelectedValue } from '../lib/lib'
import { getAllDishes } from '../services/fetchDishes'

export default function useDishes() {
  const [allDishes, setAllDishes] = useState([])
  const [selectedDishes, setSelectedDishes] = useState([])

  useEffect(() => {
    getAllDishes()
      .then((data) =>
        data.error
          ? console.log('error')
          : setAllDishes(addIsSelectedValue(data))
      )
      .then(() => console.log('Loading finished'))
  }, [])

  useEffect(() => {
    setSelectedDishes(allDishes.filter((dish) => dish.isSelected))
  }, [allDishes])

  return {
    allDishes,
    setAllDishes,
    selectedDishes,
    resetSelectedDishes,
  }

  function resetSelectedDishes() {
    setAllDishes(addIsSelectedValue(allDishes))
  }
}
