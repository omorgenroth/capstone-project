import { useEffect, useState } from 'react'
import { addIsSelectedValue } from '../lib/lib'
import { getAllDishes } from '../services/fetchDishes'

export default function useDishes() {
  const [allDishes, setAllDishes] = useState([])
  const [selectedDishes, setSelectedDishes] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)

  useEffect(() => {
    setLoading(true)
    getAllDishes()
      .then((data) =>
        data.error ? setError(true) : setAllDishes(addIsSelectedValue(data))
      )
      .then(() => setLoading(false))
  }, [])

  useEffect(() => {
    setSelectedDishes(allDishes.filter((dish) => dish.isSelected))
  }, [allDishes])

  return {
    allDishes,
    setAllDishes,
    selectedDishes,
    resetSelectedDishes,
    isError,
    isLoading,
  }

  function resetSelectedDishes() {
    setAllDishes(addIsSelectedValue(allDishes))
  }
}
