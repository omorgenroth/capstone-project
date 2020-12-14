import {
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
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import AddItemHeader from '../components/AddItemHeader/AddItemHeader'
import SearchResultItem from '../components/SearchResultItem'
import { filterIngredientsByName } from '../services/fetchIngredients'
import { updateList } from '../services/fetchLists'

export default function AddItemsPage({ currentList }) {
  const [searchValue, setSearchValue] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [newItems, setNewItems] = useState([])
  const [quantity, setQuantity] = useState()
  const [isLoading, setLoading] = useState(false)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const selection = useRef(null)
  const history = useHistory()

  console.log(searchValue)

  useEffect(() => {
    const delay = setTimeout(() => {
      if (searchValue.trim() !== '')
        filterIngredientsByName(searchValue).then((res) =>
          setSearchResults(res)
        )
    }, 500)
    return () => clearTimeout(delay)
  }, [searchValue])

  return (
    <Grid templateRows="60px auto" h="100vh">
      <AddItemHeader
        counter={newItems.length}
        onClose={() => history.push('lists/current')}
        onCreate={updateCurrList}
        inputValue={searchValue}
        setInputValue={(value) => setSearchValue(value)}
        loading={isLoading}
      />

      <Box gridRow="2/3">
        <Box mt="20px" px="15px">
          <Text fontWeight="700" py="10px">
            Ergebnisse:
          </Text>

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
            <div> </div>
          )}
        </Box>
        <Box>
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
                {selection.current && selection.current.name}
              </FormLabel>
              <NumberInput id="quantity" name="quantity">
                <NumberInputField
                  size="xs"
                  width="8ch"
                  maxLength="4ch"
                  placeholder="f.e. 300"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <div> {selection.current && selection.current.unit}</div>
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
  function updateCurrList() {
    const currList = currentList
    newItems.forEach((newItem) => {
      const index = currList.items.findIndex((item) => item.id === newItem.id)
      if (index >= 0) {
        currList.items[index].quantity += newItem.quantity
      } else {
        currList.items.push(newItem)
      }
    })

    setLoading(true)
    updateList(currList, currList.id)
      .then((res) => console.log(res))
      .then(() => setLoading(false))
      .then(() => history.push('/lists/current'))
  }
}
