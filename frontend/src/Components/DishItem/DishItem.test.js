import { render } from '@testing-library/react'
import DishItem from './DishItem'

describe('DishItem', () => {
  it('renders correctly', () => {
    const { container } = render(
      <DishItem isSelected={false} id={1} title="My Dish" />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders with the CheckedIcon if isSelected is true', () => {
    const { getByTestId } = render(
      <DishItem isSelected={true} id={1} title="My Dish" />
    )
    expect(getByTestId('checked')).toBeInTheDocument()
  })

  it('renders with the UnCheckedIcon if isSelected is false', () => {
    const { getByTestId } = render(
      <DishItem isSelected={false} id={1} title="My Dish" />
    )
    expect(getByTestId('unchecked')).toBeInTheDocument()
  })
})
