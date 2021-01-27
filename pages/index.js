import React from 'react';
import Head from 'next/head';
import db from '../db.json';
import Widget from '../src/components/Widget/index';
import Footer from '../src/components/Footer/index';
import QuizContainer from '../src/components/QuizContainer/index';
import GitHubCorner from '../src/components/GitHubCorner/index';
import QuizLogo from '../src/components/QuizLogo/index';
import QuizBackground from '../src/components/QuizBackground/index';
import Input from '../src/components/input/index';
import Button from '../src/components/button/index';
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
            <h1>Quiz Call of Duty Mobile</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={function (event) {
              event.preventDefault();
              router.push(`/quiz?name=${name}`)
            }}>
              <Input
                onChange={(event) => {
                  event.target.value.length >= 3 ? setName(event.target.value) : null
                }}
                placeholder="Nome"
                name="Nome do Usuário"
              />
              <Button type="submit" disabled={name.length === 0}>
                Vamos jogar {name}?
              </Button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget>
          <Widget.Content>
            <p>Prove que vc conhece mesmo esse jogo.</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/omnweb" />
    </QuizBackground>
  );
}
