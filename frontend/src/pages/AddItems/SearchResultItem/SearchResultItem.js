import { Box, Grid } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'

export default function SearchResultItem({ props, children, onClick }) {
  return (
    <Grid templateColumns="4fr 1fr">
      <Box gridColumn="1/2"> {children} </Box>
      <Box gridColumn="2/3">
        <IconButton
          onClick={() => onClick(props)}
          size="xs"
          icon={<AddIcon />}
          bg="primaryGreen.500"
          color="primaryBlue.500"
        />
      </Box>
    </Grid>
  )
}
