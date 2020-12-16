import { Grid, GridItem } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'
import FloatingButton from '../components/FloatingButton/FloatingButton'
import Header from '../components/Header/Header'
import ListCard from '../components/ListCard/ListCard'
import NavigationBar from '../components/NavigationBar/NavigationBar'
import PropTypes from 'prop-types'
import { useContext } from 'react'
import UserContext from '../context/UserContext'
import SideBar from '../components/SideBar/SideBar'

HomePage.propTypes = {
  currentList: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
}

export default function HomePage() {
  const history = useHistory()
  const { currentList } = useContext(UserContext)

  return (
    <Grid templateRows="60px auto 50px">
      <Header />
      <GridItem w="100%" rowStart="2" p="60px 20px 0 20px">
        {!currentList ? (
          <div> No List to display</div>
        ) : (
          <ListCard currentList={currentList} onClick={showCurrentList} />
        )}
      </GridItem>
      <FloatingButton onClick={createList} />
      <NavigationBar route="home" />
    </Grid>
  )

  function createList() {
    history.push('/dishes')
  }

  function showCurrentList() {
    history.push('/lists/current')
  }
}
