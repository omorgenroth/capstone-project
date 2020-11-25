import styled from 'styled-components/macro'
import DishItem from '../Components/DishItem'

export default function DishOverview({ dishes }) {
  return (
    <Wrapper>
      {dishes &&
        dishes.map(({ id, name, isChecked }) => {
          return <DishItem key={id} name={name} isChecked={isChecked} />
        })}
    </Wrapper>
  )
}

const Wrapper = styled.div``
