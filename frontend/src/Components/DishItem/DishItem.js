import { FaCheckCircle, FaRegCircle } from 'react-icons/fa'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

DishItem.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  isSelected: PropTypes.bool,
  onSelect: PropTypes.func,
}

export default function DishItem({ id, title, isSelected, onClick }) {
  return (
    <ItemWrapper onClick={() => onClick(id)} selected={isSelected}>
      <ContentWrapper>
        <Title> {title}</Title>
      </ContentWrapper>
      <IconWrapper>
        {isSelected ? (
          <CheckedIcon data-testid="checked" />
        ) : (
          <UncheckedIcon data-testid="unchecked" />
        )}
      </IconWrapper>
    </ItemWrapper>
  )
}

const ItemWrapper = styled.div`
  background-color: ${(props) =>
    props.selected ? 'var(--c-green)' : 'var(--c-white)'};
  box-shadow: 0px 0px 6px 3px rgba(0, 0, 0, 0.03);
  color: ${(props) => (props.selected ? 'var(--c-gray)' : 'var(--c-gray)')};
  border-radius: 15px;
  border: 2px solid var(--c-green);
  font-size: 0.5rem;
  padding: 4px 4px 4px 10px;
  display: grid;
  grid-template-columns: 3fr 1fr;
  width: 100%;
  height: 60px;
  position: relative;
`
const Title = styled.p`
  font-size: 1rem;
`

const ContentWrapper = styled.div`
  grid-column: 1/2;
`

const IconWrapper = styled.div`
  grid-column: 2/3;
`

const CheckedIcon = styled(FaCheckCircle)`
  color: var(--c-gray);
  transform: scale(2.5);
  position: absolute;
  top: 25px;
  right: 30px;
`
const UncheckedIcon = styled(FaRegCircle)`
  color: var(--c-gray);
  transform: scale(2.5);
  position: absolute;
  top: 25px;
  right: 30px;
`
