import {
  Flex,
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  useDisclosure,
  Divider,
} from '@chakra-ui/react'
import { useContext, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import AddItemHeader from './AddItemHeader/AddItemHeader'
import SearchResultItem from './SearchResultItem/SearchResultItem'
import UserContext from '../../context/UserContext'
import { filterIngredientsByName } from '../../services/fetchIngredients'
import { updateList } from '../../services/fetchLists'
import { InfoOutlineIcon } from '@chakra-ui/icons'

export default function AddItemsPage() {
  const { currentList } = useContext(UserContext)
  const [searchValue, setSearchValue] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [newItems, setNewItems] = useState([])
  const [quantity, setQuantity] = useState()
  const [isLoading, setLoading] = useState(false)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const selection = useRef(null)
  const history = useHistory()

  useEffect(() => {
    const delay = setTimeout(() => {
      if (searchValue.trim() !== '') {
        filterIngredientsByName(searchValue).then((res) =>
          setSearchResults(res)
        )
      } else {
        setSearchResults('')
      }
    }, 500)
    return () => clearTimeout(delay)
  }, [searchValue])

  return (
    <Grid templateRows="60px auto" h="100vh">
      <AddItemHeader
        counter={newItems.length}
        onClose={() => history.push('lists/current')}
        onCreate={updateCurrentList}
        inputValue={searchValue}
        setInputValue={(value) => setSearchValue(value)}
        loading={isLoading}
      />

      <Box gridRow="2/3">
        <Box mt="20px" px="15px">
          {searchResults.length > 0 ? (
            searchResults.map((result) => {
              return (
                <SearchResultItem
                  key={result.id}
                  props={result}
                  onClick={(props) => createItem(props)}>
                  {result.name}
                </SearchResultItem>
              )
            })
          ) : (
            <Flex>
              <InfoOutlineIcon m="5px" />
              <Text fontSize="0.8rem">
                Suche nach zusätzlichen Zutaten und füge Sie hinzu{' '}
              </Text>
            </Flex>
          )}
        </Box>
        <Box px="15px">
          <Divider my="20px" />
          {newItems &&
            newItems.map((item) => {
              return (
                <Tag
                  bg="primaryGreen.500"
                  color="priamryBlue.500"
                  p="5px"
                  m="3px"
                  opacity="0.8"
                  key={item.id}>
                  <TagLabel>
                    {' '}
                    {item.name} - {item.quantity} {item.unit}
                  </TagLabel>
                  <TagCloseButton />
                </Tag>
              )
            })}
        </Box>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} size="xs">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Menge hinzufügen:</ModalHeader>

          <ModalBody>
            <FormControl>
              <FormLabel>
                {selection.current &&
                  selection.current.name +
                    ' ( ' +
                    selection.current.unit +
                    ' )'}
              </FormLabel>
              <NumberInput id="quantity" name="quantity">
                <NumberInputField
                  size="xs"
                  width="8ch"
                  maxLength="4ch"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </NumberInput>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={addItem}
              bg="primaryGreen.500"
              color="primaryBlue.500"
              mr={3}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Grid>
  )

  function createItem(props) {
    selection.current = props
    onOpen()
  }

  function addItem() {
    const newItem = {
      ...selection.current,
      quantity: parseInt(quantity),
      categoryId: selection.current.category.id,
      category: selection.current.category.name,
      isSelected: false,
    }
    setNewItems([...newItems, newItem])
    setSearchValue('')
    setSearchResults('')
    onClose()
  }
  function updateCurrentList() {
    newItems.forEach((newItem) => {
      const index = currentList.items.findIndex(
        (item) => item.id === newItem.id
      )
      if (index >= 0) {
        currentList.items[index].quantity += newItem.quantity
      } else {
        currentList.items.push(newItem)
      }
    })

    setLoading(true)
    updateList(currentList, currentList.id)
      .then(() => setLoading(false))
      .then(() => history.push('/lists/current'))
  }
}
