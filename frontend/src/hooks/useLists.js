import { useEffect, useState } from 'react'
import { getActiveUserList, getUserLists } from '../services/fetchUsers'
import { updateList } from '../services/fetchLists'

export default function useLists({ userId }) {
  const [userLists, setUserLists] = useState([])
  const [currentList, setCurrentList] = useState({})

  useEffect(() => {
    getUserLists(userId)
      .then((data) => (data.error ? console.log('Error') : setUserLists(data)))
      .then(() => console.log('Loading finished'))

    getActiveUserList(userId)
      .then((data) =>
        data.error
          ? console.log('Error')
          : setCurrentList(data[data.length - 1])
      )
      .then(() => console.log('Loading finished'))
  }, [])

  return {
    currentList,
    userLists,
    setUserLists,
    updateCurrentList,
    setCurrentList,
  }

  function updateCurrentList(updatedItems) {
    setCurrentList({ ...currentList, items: updatedItems })
    const listObject = {
      name: currentList.name,
      items: updatedItems,
      active: true,
    }
    updateList(listObject, currentList.id)
  }
}
