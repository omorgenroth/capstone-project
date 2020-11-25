import { render } from '@testing-library/react'
import DishItem from './DishItem'

describe('DishItem', () => {
  it('renders with the CheckedIcon if isChecked is true', () => {
    const { getByTestId } = render(<DishItem isChecked={true} name="My Dish" />)

    expect(getByTestId('checked')).toBeInTheDocument()
  })
})
