import { useContext, useEffect, useState } from 'react'
import { getActiveUserList, getUserLists } from '../services/fetchUsers'
import { updateList } from '../services/fetchLists'
import UserContext from '../context/UserContext'

export default function useLists() {
  const { user } = useContext(UserContext)
  const [currentList, setCurrentList] = useState({})
  const [isLoadingLists, setLoadingLists] = useState(true)

  useEffect(() => {
    if (user !== undefined) {
      getActiveUserList(user.id)
        .then((data) =>
          data.error
            ? console.log('Error')
            : setCurrentList(data[data.length - 1])
        )
        .then(() => setLoadingLists(false))
    }
  }, [user])

  return {
    currentList,
    updateCurrentList,
    setCurrentList,
    isLoadingLists,
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
