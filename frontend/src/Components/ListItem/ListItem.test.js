import { render } from '@testing-library/react'
import ListItem from './ListItem'

describe('ListItem', () => {
  it('renders correctly', () => {
    const { container } = render(<ListItem title="My Dish" />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
