import styled from 'styled-components'
import db from '../db.json'
import Widget from '../src/components/Widget/index'
import Footer from '../src/components/Footer/index'

export const BackgroundImage = styled.div`
background-image: url(${db.bg});
flex:1;
background-size: cover;
background-position: center;
`

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`


export default function Home() {
  return (
    <BackgroundImage>
      <QuizContainer>
        <Widget>
          <Widget.Header>
            <h1>Call of Duty Mobile</h1>
          </Widget.Header>
          <Widget.Content>
            <p>Descrição do quiz informando sobre o tipo de assunto abordado nas questões.</p>
          </Widget.Content>
        </Widget>
        <Widget>
          <Widget.Header>
            <h1>Respondas as questões</h1>
          </Widget.Header>
          <Widget.Content>
            <p>Lorem ipsum dolor sit amet...</p>
          </Widget.Content>
        </Widget>
      </QuizContainer>
      <Footer></Footer>
    </BackgroundImage>
  )
}
