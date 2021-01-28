import React from 'react';
import db from '../db.json';
import QuizBackground from '../src/components/QuizBackground/index';
import QuizContainer from '../src/components/QuizContainer/index';
import QuizLogo from '../src/components/QuizLogo/index';
import Widget from '../src/components/Widget/index';
import Button from '../src/components/button/index';

function LoadingWidget() {
    return (
        <Widget>
            <Widget.Header>
                Carregando...
        </Widget.Header>

            <Widget.Content>
                <p>[Desafio do Loading]</p>
            </Widget.Content>
        </Widget>
    );
}

function QuestionWidget({
    question,
    totalQuestions,
    questionIndex,
    onSubmit,
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
                <form onSubmit={(event) => {
                    event.preventDefault()
                    setIsQuestionSubmited(true)
                    setTimeout(() => {
                        onSubmit()
                        setIsQuestionSubmited(false)
                        setSelectedAlternative(undefined)
                    }, 3 * 1000)
                }}>
                    {question.alternatives.map((alternative, alternativeIndex) => {
                        const alternativeId = `alternative__${alternativeIndex}`
                        return (
                            <Widget.Topic
                                as="label"
                                key={alternativeId}
                                htmlFor={alternativeId}>
                                <input

                                    id={alternativeId}
                                    name={questionId}
                                    type="radio"
                                    onChange={() => setSelectedAlternative(alternativeIndex)}
                                // style={{ display: 'none' }}
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
                    {console.log(isQuestionSubmited) && isQuestionSubmited && isCorrect && <p>Resposta certa!</p>}
                    {isQuestionSubmited && !isCorrect && <p>Resposta Errada!</p>}
                </form>
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
    const totalQuestions = db.questions.length
    const [currentQuestion, setCurrentQuestion] = React.useState(0)
    const questionIndex = currentQuestion
    const question = db.questions[questionIndex]

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
                />}
                {screenState === screenStates.LOADING && <LoadingWidget />}
                {screenState === screenStates.RESULT && <div><p>Você acertou X Qustões</p></div>}
            </QuizContainer>
        </QuizBackground>
    )
}