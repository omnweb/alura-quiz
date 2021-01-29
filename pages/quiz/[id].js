import React from 'react';
import QuizScreen from '../../src/screens/Quiz/index';
import { ThemeProvider } from "styled-components"

export default function QuizDaGaleraPage({ dbExterno }) {
    return (
        <div>
            <ThemeProvider theme={dbExterno.theme}>
                <QuizScreen
                    externalQuestions={dbExterno.questions}
                    externalBg={dbExterno.bg}
                >
                    {/* <pre style={{ color: 'black' }}>
                    {JSON.stringify(dbExterno.questions, null, 4)}
                </pre> */}
                </QuizScreen>
            </ThemeProvider>
        </div>
    )
}

export async function getServerSideProps(context) {
    // console.log(context.query.id)
    const [projectName, githubUser] = context.query.id.split('___')
    try {
        const dbExterno = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
            .then((respostaDoServer) => {
                if (respostaDoServer.ok) {
                    return respostaDoServer.json()
                }
                throw new Error('Falha de conexão com banco de dados')
            })
            .then(respostaConvertidaEmObjeto => respostaConvertidaEmObjeto)
        // .catch((err) => console.error(err))

        // console.log("DbExterno", dbExterno)

        return {
            props: { dbExterno }, // will be passed to the page component as props
        }

    } catch (err) {
        throw new Error(err)
    }
}