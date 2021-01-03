import { Grid, GridItem } from '@chakra-ui/react'
import Header from '../../components/Header/Header'
import NavigationBar from '../../components/NavigationBar/NavigationBar'
import ListCard from '../../components/ListCard/ListCard'

export default function ArchivePage() {
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
      <NavigationBar route="archive" />
    </Grid>
  )
}
