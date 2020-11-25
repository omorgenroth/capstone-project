import styled from 'styled-components/macro'
import { FaCheckCircle, FaRegCircle } from 'react-icons/fa'

export default function DishItem({ name, ingredients, isChecked }) {
  return (
    <ItemWrapper>
      <div>
        <h2> Spaghetti Bolognese</h2>
        <p> Tomaten, Hackfleisch, Karotten</p>
      </div>
      <div>
        <CheckedIcon isChecked={isChecked} />
        <UncheckedIcon isChecked={isChecked} />
      </div>
    </ItemWrapper>
  )
}

const ItemWrapper = styled.div`
  background-color: var(--c-white);
  box-shadow: 0, 3px, 6px, rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  font-size: 0.5rem;
  padding: 4px 4px 4px 10px;
  display: flex;
  width: 200px;
  height: 60px;
  position: relative;
`

const CheckedIcon = styled(FaCheckCircle)`
  color: var(--c-gray);
  transform: scale(2);
  position: absolute;
  top: 25px;
  right: 30px;
  display: ${(props) => (props.isChecked ? 'block' : 'none')};
`
const UncheckedIcon = styled(FaRegCircle)`
  color: var(--c-gray);
  transform: scale(2);
  position: absolute;
  top: 25px;
  right: 30px;
  display: ${(props) => (props.isChecked ? 'none' : 'block')};
`
