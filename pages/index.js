import React from 'react';
import Head from 'next/head';
import db from '../db.json';
import Widget from '../src/components/Widget/index';
import Footer from '../src/components/Footer/index';
import QuizContainer from '../src/components/QuizContainer/index';
import GitHubCorner from '../src/components/GitHubCorner/index';
import QuizLogo from '../src/components/QuizLogo/index';
import QuizBackground from '../src/components/QuizBackground/index';
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('')
  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <meta property="og:title" content="COD Mobile Quiz" />
        <meta property="og:image" content={db.bg} />
        <title>COD Mobile Quiz</title>
      </Head>
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
            <form onSubmit={function (event) {
              event.preventDefault();
              router.push(`/quiz?name=${name}`)
              console.log('Submentendo form')
              // Router manda para a próxima página
            }}>
              <input onChange={
                function (event) {
                  // name = event.target.value
                  // console.log(name)
                  // Estado
                  setName(event.target.value)

                }
              } placeholder="Nome" />
              <button type="submit" disabled={name.length === 0}>
                Jogar {name}
              </button>
            </form>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/omnweb" />
    </QuizBackground>
  );
}
