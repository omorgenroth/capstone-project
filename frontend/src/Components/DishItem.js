import styled from 'styled-components/macro'
import { FaCheckCircle, FaRegCircle } from 'react-icons/fa'

export default function DishItem({ name, isChecked }) {
  return (
    <ItemWrapper>
      <div>
        <h3> {name}</h3>
        <p> Ingredient1, Ingredient2, Ingredient3 </p>
      </div>
      <IconWrapper>
        <CheckedIcon checked={isChecked} />
        <UncheckedIcon checked={isChecked} />
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
  display: ${(props) => (props.checked ? 'block' : 'none')};
`
const UncheckedIcon = styled(FaRegCircle)`
  color: var(--c-gray);
  transform: scale(2);
  position: absolute;
  top: 25px;
  right: 30px;
  display: ${(props) => (props.checked ? 'none' : 'block')};
`
