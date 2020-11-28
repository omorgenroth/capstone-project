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
  color: var(--c-orange);
  transform: scale(1);
  margin-right: 5px;
`

const Ruler = styled.hr`
  border: 1px solid var(--c-green);
  width: 85%;
`
