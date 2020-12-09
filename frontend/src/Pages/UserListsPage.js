import styled from 'styled-components/macro'
import Header from '../Components/Header'

import HeaderOverlay from '../Components/HeaderOverlay/HeaderOverlay'
import NavigationBar from '../Components/NavigationBar'

export default function Home() {
  return (
    <PageWrapper>
      <Header />
      <ContentWrapper></ContentWrapper>
      <NavigationBar />
    </PageWrapper>
  )
}

const PageWrapper = styled.div`
  display: grid;
  grid-template-rows: 60px auto 50px;
`
const ContentWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  padding: 15px 20px 0 20px;
  grid-row: 2/3;
  min-width: 100%;
`
