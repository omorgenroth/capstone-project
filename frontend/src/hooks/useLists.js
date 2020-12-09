import { useEffect, useState } from 'react'
import { getUserLists } from '../services/fetchUsers'
import { updateList } from '../services/fetchLists'

export default function useLists({ userId, updatedItems }) {
  const [currentList, setCurrentList] = useState({})
  const [userLists, setUserLists] = useState([])

  useEffect(() => {
    getUserLists(userId)
      .then((data) => (data.error ? console.log('Error') : setUserLists(data)))
      .then(() => console.log('Loading finished'))
  }, [])

  useEffect(() => {
    const currentItem = userLists[userLists.length - 1]
    setCurrentList(currentItem)
  }, [userLists])

  useEffect(() => {
    currentList &&
      updateList(currentList, currentList.id).then((res) => console.log(res))
  }, [currentList])

  return {
    currentList,
    setCurrentList,
    userLists,
    setUserLists,
    updateCurrentList,
  }

  function updateCurrentList(updatedItems) {
    setCurrentList({ ...currentList, items: updatedItems })
    const listObject = {
      name: currentList.name,
      userId: currentList.id,
      items: updatedItems,
    }
  }
}
