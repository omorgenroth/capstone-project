import { FaMinusCircle } from 'react-icons/fa'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

ListItem.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  onDelete: PropTypes.func,
}

export default function ListItem({ id, title, onDelete }) {
  return (
    <>
      <ItemWrapper>
        <Title>{title}</Title>
        <DeleteIcon onClick={() => onDelete(id)} />
      </ItemWrapper>
      <Ruler />
    </>
  )
}

const ItemWrapper = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
`

const Title = styled.div`
  font-size: 1rem;
  grid-column: 1/2;
`

const DeleteIcon = styled(FaMinusCircle)`
  color: var(--c-orange);
  transform: scale(1);
  grid-column: 2/3;
`

const Ruler = styled.hr`
  border: 0.2px solid var(--c-green);
  width: 100%;
`
