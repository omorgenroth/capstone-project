import { Box, Flex, Heading, Progress, Text } from '@chakra-ui/react'
import * as dayjs from 'dayjs'
import PropTypes from 'prop-types'

ListCard.propTypes = {
  currentList: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default function ListCard({ currentList, onClick }) {
  if (!currentList) {
    return <div> LOADING..</div>
  } else {
    const date = dayjs(currentList.createdDate).format('DD/MM/YY')
    const items = currentList.items
    const total = items.length
    const done = items.filter((el) => {
      return el.isSelected
    }).length

    return (
      <Box
        onClick={onClick}
        borderRadius="3px"
        boxShadow="base"
        p="10px"
        w="90%"
        h="100px">
        <Flex justify="space-between">
          <Heading size="md">
            {currentList.name === ''
              ? 'Liste Nr. ' + currentList.id
              : ' ' + currentList.name}
          </Heading>
          <Text fontSize="sm">
            {done} / {total}
          </Text>
        </Flex>
        <Progress colorScheme="teal" value={done} max={total} m="5px" />
        <Text fontSize="xs" textAlign="right" mt="20px">
          created: {date}
        </Text>
      </Box>
    )
  }
}
