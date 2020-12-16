import { FormControl, FormLabel, Input } from '@chakra-ui/react'

export default function AddItemForm({ nameValue, setNameValue }) {
  return (
    <FormControl>
      <FormLabel htmlFor="name">Item Name: </FormLabel>
      <Input
        id="name"
        value={nameValue}
        onChange={(e) => setNameValue(e.target.value)}
        size="sm"
        placeholder="Start typing.."
      />
    </FormControl>
  )
}
