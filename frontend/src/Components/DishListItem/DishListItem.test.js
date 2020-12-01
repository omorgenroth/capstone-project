import { render } from '@testing-library/react'
import DishListItem from './DishListItem'

describe('DishListItem', () => {
  it('renders correctly', () => {
    const { container } = render(<DishListItem title="My Dish" />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
