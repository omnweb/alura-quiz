import React from 'react';
import Head from 'next/head';
import db from '../db.json';
import Widget from '../src/components/Widget/index';
import Link from '../src/components/Link/index';
import Footer from '../src/components/Footer/index';
import QuizContainer from '../src/components/QuizContainer/index';
import GitHubCorner from '../src/components/GitHubCorner/index';
import QuizLogo from '../src/components/QuizLogo/index';
import QuizBackground from '../src/components/QuizBackground/index';
import Input from '../src/components/Input/index';
import Button from '../src/components/Button/index';
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('')
  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <link rel="icon" href="assets/favicon/cod.ico" sizes="16x16" type="image/ico" />
        <meta property="og:title" content="COD Mobile Quiz" />
        <meta property="og:image" content={db.bg} />
        <title>COD Mobile Quiz</title>
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget
          as={motion.section}
          transition={{ delay: 0, dutation: 0.5 }}
          variants={{
            show: { opacity: 1, x: "0" },
            hidden: { opacity: 0, x: "-100%" },
          }}
          initial="hidden"
          animate="show"
        >
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
        <Widget
          as={motion.section}
          transition={{ delay: 0.5, dutation: 0.5 }}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Content>
            <h2><strong>Quizis da galera</strong></h2><br />
            {/* <ul> */}
            {db.external.map((externalLink) => {
              const [projectName, githubUser] = externalLink
                .replace(/\//g, '')
                .replace('https:', '')
                .replace('vercel.app', '')
                .split('.')
              return (
                <div key={externalLink}>
                  <Widget.Topic as={Link} href={`/quiz/${projectName}___${githubUser}`}>
                    {`${githubUser}/${projectName}`}
                  </Widget.Topic>
                </div>
              )
            })}
            {/* </ul> */}
          </Widget.Content>
        </Widget>
        <Footer
          as={motion.section}
          transition={{ delay: 0.7, dutation: 0.5 }}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="show"
        />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/omnweb" />
    </QuizBackground>
  );
}
