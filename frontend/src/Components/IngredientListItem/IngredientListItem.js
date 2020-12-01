import styled from 'styled-components/macro'
import { FaCheckCircle, FaRegCircle } from 'react-icons/fa'

export default function IngredientListItem({ props, onClick, isChecked }) {
  return (
    <ItemWrapper onClick={() => onClick(props.id)} checked={isChecked}>
      <IconWrapper>
        {isChecked ? (
          <CheckedIcon data-testid="checked" />
        ) : (
          <UncheckedIcon data-testid="unchecked" />
        )}
      </IconWrapper>
      <ContentWrapper>
        {props.name}
        {`  ( ${props.quantity}${props.unit} )`}
      </ContentWrapper>
    </ItemWrapper>
  )
}

const ItemWrapper = styled.div`
  font-size: 1rem;
  display: grid;
  grid-template-columns: 25px auto;
`

const ContentWrapper = styled.div`
  grid-column: 2/3;
`

const IconWrapper = styled.div`
  grid-column: 1/2;
`

const CheckedIcon = styled(FaCheckCircle)`
  color: var(--c-gray);
  transform: scale(1);
`
const UncheckedIcon = styled(FaRegCircle)`
  color: var(--c-gray);
  transform: scale(1);
`
