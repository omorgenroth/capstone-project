import { render } from '@testing-library/react'
import user from '@testing-library/user-event'
import FloatingButton from './FloatingButton'

describe('FLoatingButton', () => {
  it('renders correctly', () => {
    const mockOnClick = jest.fn()
    const { container } = render(<FloatingButton onClick={mockOnClick} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('calls a function onClick', () => {
    const mockOnClick = jest.fn()
    const { getByTestId } = render(<FloatingButton onClick={mockOnClick} />)
    const button = getByTestId('floating-button')
    user.click(button)
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })
})
