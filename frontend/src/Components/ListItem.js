import styled from 'styled-components/macro'
import { FaMinusCircle } from 'react-icons/fa'

export default function ListItem({ id, title, onDelete }) {
  return (
    <>
      <ItemWrapper>
        <DeleteIcon onClick={() => onDelete(id)} />
        <Title>{title}</Title>
      </ItemWrapper>
      <Ruler />
    </>
  )
}

const ItemWrapper = styled.div`
  display: flex;
`

const Title = styled.div`
  font-size: 1rem;
`

const DeleteIcon = styled(FaMinusCircle)`
  color: #ff6e4a;
  transform: scale(1);
  margin-right: 5px;
`

const Ruler = styled.hr`
  border: 1px solid var(--c-green);
  width: 85%;
`
