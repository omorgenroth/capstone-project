import { render } from '@testing-library/react'
import DishItem from './DishItem'

describe('DishItem', () => {
  it('renders with the CheckedIcon if isSelected is true', () => {
    const { getByTestId } = render(
      <DishItem isSelected={true} name="My Dish" />
    )

    expect(getByTestId('checked')).toBeInTheDocument()
  })
})
