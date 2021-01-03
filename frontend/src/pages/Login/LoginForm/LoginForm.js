import {
  Button,
  chakra,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react'

export default function LoginForm({ state, submitData }) {
  return (
    <chakra.form>
      <FormControl isRequired isInvalid={state === 'error' ? true : false}>
        <FormLabel>Email</FormLabel>
        <Input
          name="email"
          type="email"
          placeholder="max@mustermann.de"
          bg="white"
        />
      </FormControl>
      <FormControl
        mt={6}
        isRequired
        isInvalid={state === 'error' ? true : false}>
        <FormLabel>Passwort</FormLabel>
        <Input
          name="password"
          type="password"
          placeholder="*******"
          bg="white"
        />
        <FormErrorMessage px="10px" color="primaryBlue.500">
          Passwort oder E-Mail falsch
        </FormErrorMessage>
      </FormControl>

      <Button
        width="full"
        mt={4}
        type="submit"
        isLoading={state === 'loading' ? true : false}
        loadingText="Übermittle Daten"
        onClick={(e) => handleSubmit(e)}>
        Einloggen
      </Button>
    </chakra.form>
  )

  function handleSubmit(e) {
    e.preventDefault()
    const form = e.target.form
    const email = form.email.value
    const password = form.password.value
    submitData({ email: email, password: password })
    form.reset()
  }
}
