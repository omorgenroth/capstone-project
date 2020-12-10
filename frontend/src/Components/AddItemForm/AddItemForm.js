import { FormControl, FormLabel, Input } from '@chakra-ui/react'

export default function AddItemForm() {
  return (
    <FormControl>
      <FormLabel>Item Name: </FormLabel>
      <Input size="sm" placeholder="Start typing.." />
      <FormLabel>Quantity: </FormLabel>
      <Input size="sm" placeholder="Start typing.." />
    </FormControl>
  )
}
