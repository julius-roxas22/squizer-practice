import QuizData from '../data/quiz'
import QuizCards from '../cards/quizCards'
import React from 'react'

export default function Main() {

    const [answerObject, setAnswerObject] = React.useState([])
    const [listScore, setListScore] = React.useState([])
    const [finish, setFinish] = React.useState(false)
    const [result, setResult] = React.useState([])
    const [score, setScore] = React.useState(0)

    const quizData = QuizData.map(quiz => {
        return (
            <QuizCards key={quiz.id} finishQuiz={finish} resultQuiz={result} quiz={quiz} setAnswer={addAnswer} />
        )
    })

    React.useEffect(() => {
        let array = []
        for (let i = 0; i < QuizData.length; i++) {
            for (let j = 0; j < answerObject.length; j++) {
                const quiz = QuizData[i]
                const myQuiz = answerObject[j]
                if (quiz.id === myQuiz.id) {
                    if (quiz.question === myQuiz.question) {
                        const isExist = result.some(res => res.id === quiz.id)
                        if (quiz.correct_answer === myQuiz.myAnswer) {
                            if (!isExist) {
                                addResult({ id: myQuiz.id, isCorrect: true })
                            }
                            else {
                                addResult({ id: myQuiz.id, isCorrect: false })
                            }
                            array.push(1)
                        } else if (quiz.correct_answer !== myQuiz.myAnswer) {
                            if (!isExist) {
                                addResult({ id: myQuiz.id, isCorrect: false })
                            }
                        }
                    }
                }
            }
        }

        setListScore(array)
    }, [answerObject])

    function addAnswer(questionObject) {

        const { id, question, choice } = questionObject

        const addObjectAnswer = {
            id: id,
            question: question,
            myAnswer: choice,
        }

        const isAnswerExist = answerObject.some(answer => id === answer.id)
        if (isAnswerExist) {
            setAnswerObject(oldAnswer => oldAnswer.map(ans => {
                return ans.id === id ? { ...ans, myAnswer: choice } : ans
            }))
        }
        else {
            setAnswerObject(oldAnswer => [...oldAnswer, addObjectAnswer])
        }

    }

    function addResult(question) {
        const { id } = question
        const isExistResult = result.some(res => res.id === id)
        if (!isExistResult) {
            setResult(oldResult => [...oldResult, question])
        }
    }

    function updateResult(id) {
        setResult(oldResults => oldResults.map(result => {
            return result.id === id ? { ...result, isCorrect: !result.isCorrect } : result
        }))
    }

    function submitAnswer() {
        setFinish(true)
        let currentScore = 0
        for (let i = 0; i < listScore.length; i++) {
            currentScore += listScore[i]
        }
        setScore(currentScore)

        result.map(res => {
            console.log(res.id + " " + res.isCorrect)
        })
    }

    return (
        <main className='main'>
            <div className='content'>
                <div className='title_holder'>
                    <h1 className='text--title'>Squizer Game</h1>
                    {finish && <h4 className={score >= 3 ? 'text--score_pass' : 'text--score_fail'}>{score} over {QuizData.length}</h4>}
                </div>
                <div className='content--body'>
                    {quizData}
                    <button onClick={submitAnswer} className='btn_submit'>Submit</button>
                </div>
            </div>
        </main>
    )
}