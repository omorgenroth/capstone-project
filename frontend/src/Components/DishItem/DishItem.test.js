import { render } from '@testing-library/react'
import DishItem from './DishItem'

describe('DishItem', () => {
  it('renders with the CheckedIcon if isSelected is true', () => {
    const { getByTestId } = render(
      <DishItem isSelected={true} title="My Dish" />
    )

    expect(getByTestId('checked')).toBeInTheDocument()
  })

  it('renders with the UnCheckedIcon if isSelected is false', () => {
    const { getByTestId } = render(
      <DishItem isSelected={false} title="My Dish" />
    )

    expect(getByTestId('unchecked')).toBeInTheDocument()
  })
})
