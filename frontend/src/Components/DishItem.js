import { FaCheckCircle, FaRegCircle } from 'react-icons/fa'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

DishItem.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  onSelect: PropTypes.func,
}

export default function DishItem({ id, title, isSelected, onSelect }) {
  return (
    <ItemWrapper onClick={() => onSelect(id)}>
      <ContentWrapper>
        <Title> {title}</Title>
        <p> Ingredient1, Ingredient2, Ingredient3 </p>
      </ContentWrapper>
      <IconWrapper>
        {isSelected ? (
          <CheckedIcon data-testid="checked" checked={isSelected} />
        ) : (
          <UncheckedIcon data-testid="unchecked" checked={isSelected} />
        )}
      </IconWrapper>
    </ItemWrapper>
  )
}

const ItemWrapper = styled.div`
  background-color: ${(props) => (props.checked ? 'blue' : 'var(--c-white)')};
  box-shadow: 0, 3px, 6px, rgba(0, 0, 0, 0.5);
  border-radius: 15px;
  font-size: 0.5rem;
  padding: 4px 4px 4px 10px;
  display: grid;
  grid-template-columns: 3fr 1fr;
  width: 85%;
  height: 60px;
  position: relative;
`
const Title = styled.h2`
  font-size: 1.5em;
`

const ContentWrapper = styled.div`
  grid-column: 1/2;
`

const IconWrapper = styled.div`
  grid-column: 2/3;
`

const CheckedIcon = styled(FaCheckCircle)`
  color: var(--c-gray);
  transform: scale(2);
  position: absolute;
  top: 25px;
  right: 30px;
`
const UncheckedIcon = styled(FaRegCircle)`
  color: var(--c-gray);
  transform: scale(2);
  position: absolute;
  top: 25px;
  right: 30px;
`
