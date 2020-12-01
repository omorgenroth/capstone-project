import styled from 'styled-components/macro'
import { FaCheckCircle, FaRegCircle } from 'react-icons/fa'
import PropTypes from 'prop-types'

IngredientListItem.propTypes = {
  props: PropTypes.object,
  onClick: PropTypes.func,
}

export default function IngredientListItem({ props, onClick }) {
  return (
    <ItemWrapper onClick={() => onClick(props.id)} checked={props.isSelected}>
      <IconWrapper>
        {props.isSelected ? (
          <CheckedIcon data-testid="checked" />
        ) : (
          <UncheckedIcon data-testid="unchecked" />
        )}
      </IconWrapper>
      <ContentWrapper>
        {props.name}
        {props.quantity !== 0
          ? '  ( ' + props.quantity + props.unit + ' )'
          : ''}
      </ContentWrapper>
    </ItemWrapper>
  )
}

const ItemWrapper = styled.div`
  font-size: 1rem;
  display: grid;
  grid-template-columns: 25px auto;
  color: ${(props) => (props.checked ? 'lightgray' : 'var(--c-gray)')};
  text-decoration: ${(props) => (props.checked ? 'line-through' : 'none')};
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
