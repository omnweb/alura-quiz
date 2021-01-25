import db from '../db.json'
import Widget from '../src/components/Widget/index'
import Footer from '../src/components/Footer/index'
import QuizContainer from '../src/components/QuizContainer/index'
import GitHubCorner from '../src/components/GitHubCorner/index'
import QuizLogo from '../src/components/QuizLogo/index'
import QuizBackground from '../src/components/QuizBackground/index'

export default function Home() {
  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
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
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/omnweb/alura-quiz" />
    </QuizBackground>
  )
}
