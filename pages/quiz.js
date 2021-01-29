import React from 'react';
import db from '../db.json';
import QuizBackground from '../src/components/QuizBackground/index';
import QuizContainer from '../src/components/QuizContainer/index';
import QuizLogo from '../src/components/QuizLogo/index';
import Widget from '../src/components/Widget/index';
import Button from '../src/components/Button/index';
import AlternativeForm from '../src/components/AlternativeForm/index';
import Loading from '../src/components/LoadingWidget/index';

function ResultWidget({ results }) {
    return (
        <Widget>
            <Widget.Header>
                Tela de resultado
        </Widget.Header>

            <Widget.Content>
                <strong>
                    Você acertou
                    {' '}
                    {results.reduce((somatoriaAtual, resultAtual) => {
                        const isRight = resultAtual === true
                        if (isRight) {
                            return somatoriaAtual + 1
                        }
                        return somatoriaAtual

                    }, 0)

                    }
                    {/* {finalResult = results.filter(result => result).length} */}
                    {' '}
                    perguntas
                </strong>
                <ul>
                    {results.map((result, index) => (
                        <li>

                            {`${index + 1} Resultado: `}
                            {result === true ? "Acertou" : "Errou"}

                        </li>
                    )
                    )}
                </ul>
            </Widget.Content>
        </Widget>
    );
}

function LoadingWidget() {
    return (
        <Loading />
    );
}

function QuestionWidget({
    question,
    totalQuestions,
    questionIndex,
    onSubmit,
    addResult,
}) {
    const [selectedAlternative, setSelectedAlternative] = React.useState(undefined)
    const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false)
    const questionId = `question__${questionIndex}`
    const isCorrect = selectedAlternative === question.answer
    const hasSelectedAlternative = selectedAlternative !== undefined
    return (
        <Widget>
            <Widget.Header>
                {/* <BackLinkArrow href="/" /> */}
                <h3>
                    {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
                </h3>
            </Widget.Header>
            <img
                alt="Descrição"
                style={{
                    width: '100%',
                    height: '150px',
                    objectFit: 'cover',
                }}
                src={question.image}
            />
            <Widget.Content>
                <h2><strong>{question.title}</strong></h2>
                <p>{question.description}</p>
                <AlternativeForm onSubmit={(event) => {
                    event.preventDefault()
                    setIsQuestionSubmited(true)
                    setTimeout(() => {
                        addResult(isCorrect)
                        onSubmit()
                        setIsQuestionSubmited(false)
                        setSelectedAlternative(undefined)
                    }, 1 * 1000)
                }}>
                    {question.alternatives.map((alternative, alternativeIndex) => {
                        const alternativeId = `alternative__${alternativeIndex}`
                        const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR'
                        const isSelectd = selectedAlternative === alternativeIndex + 1
                        return (
                            <Widget.Topic
                                as="label"
                                key={alternativeId}
                                htmlFor={alternativeId}
                                data-selected={isSelectd}
                                data-status={isQuestionSubmited && alternativeStatus}
                            >

                                <input

                                    id={alternativeId}
                                    name={questionId}
                                    type="radio"
                                    onChange={() => setSelectedAlternative(alternativeIndex + 1)}
                                    style={{ display: 'none' }}
                                    style={{ display: 'none' }}
                                />
                                {`${alternative} `}
                            </Widget.Topic>
                        )
                    })}

                    {/* <pre>
                        {JSON.stringify(question, null, 4)}
                    </pre> */}

                    <Button type="submit" disabled={!hasSelectedAlternative}>
                        Confirmar
                    </Button>
                    {/* { isQuestionSubmited && selectedAlternative === question.answer ? <p>Resposta certa!</p> : <p>Resposta Errada!</p>} */}
                    {isQuestionSubmited && isCorrect && <p>Resposta certa!</p>}
                    {isQuestionSubmited && !isCorrect && <p>Resposta Errada!</p>}
                </AlternativeForm>
            </Widget.Content>
        </Widget>
    )
}

const screenStates = {
    QUIZ: "QUIZ",
    LOADING: "LOADING",
    RESULT: "RESULT",
}

export default function QuizPage() {
    const [screenState, setScreenState] = React.useState(screenStates.LOADING)
    const [results, setResults] = React.useState([])
    const totalQuestions = db.questions.length
    const [currentQuestion, setCurrentQuestion] = React.useState(0)
    const questionIndex = currentQuestion
    const question = db.questions[questionIndex]

    function addResult(result) {
        setResults([
            ...results,
            result
        ])
    }

    React.useEffect(() => {
        setTimeout(() => {
            setScreenState(screenStates.QUIZ)
        }, 1 * 1000)
    }, [])

    function submitHandlerQuiz() {
        const nextQuestion = questionIndex + 1
        if (nextQuestion < totalQuestions) {
            setCurrentQuestion(nextQuestion)
        } else {
            setScreenState(screenStates.RESULT)
        }

    }

    return (
        <QuizBackground backgroundImage={db.bg}>
            <QuizContainer>
                <QuizLogo />
                {screenState === screenStates.QUIZ && <QuestionWidget
                    question={question}
                    questionIndex={questionIndex}
                    totalQuestions={totalQuestions}
                    onSubmit={submitHandlerQuiz}
                    addResult={addResult}
                />}
                {screenState === screenStates.LOADING && <LoadingWidget />}
                {screenState === screenStates.RESULT && <div><ResultWidget results={results} /></div>}
            </QuizContainer>
        </QuizBackground>
    )
}