import { useEffect, useState } from 'react'
import { addIsSelectedValue } from '../lib/lib'
import { getAllDishes } from '../services/fetchDishes'

export default function useDishes() {
  const [allDishes, setAllDishes] = useState([])
  const [isLoadingDishes, setLoadingDishes] = useState(false)
  const [isError, setError] = useState(false)
  let selectedDishes = allDishes.filter((dish) => dish.isSelected)

  useEffect(() => {
    setLoadingDishes(true)
    getAllDishes()
      .then((data) =>
        data.error ? setError(true) : setAllDishes(addIsSelectedValue(data))
      )
      .then(() => setLoadingDishes(false))
  }, [])

  return {
    allDishes,
    setAllDishes,
    selectedDishes,
    resetSelectedDishes,
    isError,
    isLoadingDishes,
  }

  function resetSelectedDishes() {
    setAllDishes(addIsSelectedValue(allDishes))
  }
}
