import { Grid, GridItem } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'
import FloatingButton from '../components/FloatingButton/FloatingButton'
import Header from '../components/Header/Header'
import ListCard from '../components/ListCard/ListCard'
import NavigationBar from '../components/NavigationBar/NavigationBar'
import PropTypes from 'prop-types'

HomePage.propTypes = {
  currentList: PropTypes.object.isRequired,
}

export default function HomePage({ currentList }) {
  const history = useHistory()

  return (
    <Grid templateRows="60px auto 50px">
      <Header />
      <GridItem w="100%" rowStart="2" p="60px 20px 0 20px">
        <div> Letzte:</div>
        <ListCard currentList={currentList} onClick={showCurrentList} />
      </GridItem>
      <FloatingButton onClick={createList} />
      <NavigationBar route="home" />
    </Grid>
  )

  function createList() {
    history.push('/dishes')
  }

  function showCurrentList() {
    console.log('moin')
    history.push('/lists/current')
  }
}
