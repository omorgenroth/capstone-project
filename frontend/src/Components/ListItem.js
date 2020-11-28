import styled from 'styled-components/macro'
import { FaMinus } from 'react-icons/fa'

export default function ListItem({ title }) {
  return (
    <ItemWrapper>
      <IconWrapper>
        <Circle>
          <DeleteIcon />
        </Circle>
      </IconWrapper>
      <ContentWrapper>
        <Title>{title}</Title>
      </ContentWrapper>

      <Ruler />
    </ItemWrapper>
  )
}

const ItemWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-template-rows: 3fr 1fr;
`
const Title = styled.h2`
  font-size: 1rem;
`

const ContentWrapper = styled.div`
  grid-column: 2/3;
`

const IconWrapper = styled.div`
  grid-column: 1/2;
`
const DeleteIcon = styled(FaMinus)`
  color: var(--c-gray);
  transform: scale(1.5);
  padding-right: 10px;
  z-index: 5;
`

const Ruler = styled.hr`
  border: 0.3px solid var(--c-green);
  grid-column: 1/-1;
  grid-row: 2/3;
`
const Circle = styled.div`
  border-radius: 50%;
  border: none;
  background: #ff6e4a;
  width: 20px;
`
