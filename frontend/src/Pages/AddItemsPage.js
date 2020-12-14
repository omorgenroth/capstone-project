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
  TagLabel,
  TagCloseButton,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { useEffect, useState, useRef } from 'react'
import AddItemForm from '../components/AddItemForm/AddItemForm'
import HeaderOverlay from '../components/HeaderOverlay/HeaderOverlay'
import SearchResultItem from '../components/SearchResultItem'
import { filterIngredientsByName } from '../services/fetchIngredients'
import { useHistory } from 'react-router-dom'

export default function AddItemsPage(currentList) {
  const [searchValue, setSearchValue] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [newItems, setNewItems] = useState([])
  const [quantity, setQuantity] = useState()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const currentListRef = useRef(currentList)
  const selection = useRef(null)
  const history = useHistory()

  useEffect(() => {
    const delay = setTimeout(() => {
      if (searchValue.trim() !== '')
        filterIngredientsByName(searchValue).then((res) =>
          setSearchResults(res)
        )
    }, 500)
    return () => clearTimeout(delay)
  }, [searchValue])

  console.log(newItems)

  return (
    <Grid templateRows="60px auto" h="100vh">
      <HeaderOverlay
        onClose={() => history.push('/lists/current')}
        counter={newItems.length}
      />
      <Box gridRow="2/3">
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

        <AddItemForm
          nameValue={searchValue}
          setNameValue={(value) => setSearchValue(value)}
        />
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
            <div> No Results..</div>
          )}
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
}
