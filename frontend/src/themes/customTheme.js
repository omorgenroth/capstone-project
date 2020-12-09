import { extendTheme } from '@chakra-ui/react'

const customTheme = extendTheme({
  colors: {
    primaryGreen: {
      500: '#93e2ca',
    },
    primaryBlue: {
      500: '#1a212c',
    },
  },
})

export default customTheme
