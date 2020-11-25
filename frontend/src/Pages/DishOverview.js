import { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import DishItem from '../Components/DishItem'
import { Link } from 'react-router-dom'

export default function DishOverview({ dishes }) {
  return (
    <Wrapper>
      <Header>
        <LinkStyled to="/">X</LinkStyled>
        <p>Dish Overview</p>
      </Header>
      <Grid>
        {dishes &&
          dishes.map(({ id, name, isChecked }) => {
            return <DishItem key={id} name={name} isChecked={isChecked} />
          })}
      </Grid>
    </Wrapper>
  )
}

const Wrapper = styled.div``

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  z-index: 10;
  background-color: var(--c-white);
  border-radius: 0 0 10px 10px;
  position: sticky;
  top: 0;
`
const LinkStyled = styled(Link)`
  text-decoration: none;
  color: var(--c-gray);
  font-size: 1rem;
  position: fixed;
  left: 20px;
`

const Grid = styled.div`
  display: grid;
  grid-gap: 10px;
  padding: 10px;
`
