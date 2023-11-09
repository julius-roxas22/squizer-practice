import QuizData from '../data/quiz'
import QuizCards from '../cards/quizCards'
import React from 'react'

export default function Main() {

    const [answerObject, setAnswerObject] = React.useState([])

    const [score, setScore] = React.useState(0)

    const quizData = QuizData.map(quiz => {
        return (
            <QuizCards key={quiz.id} quiz={quiz} setAnswer={addAnswer} />
        )
    })

    function addAnswer(questionObject) {

        for (let i = 0; i < QuizData.length; i++) {
            for (let j = 0; j < answerObject.length; j++) {
                const quiz = QuizData[i]
                const myQuiz = answerObject[j]
                if (quiz.id === myQuiz.id && quiz.correct_answer === myQuiz.myAnswer && quiz.question === myQuiz.question) {
                    setScore(score + 1)
                }
            }
        }

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

    function submitAnswer() {
        console.log("Your Score: " + score)
        if (answerObject.length > 0) {
            answerObject.splice(0, answerObject.length)
            setScore(0)
        }
    }

    return (
        <main className='main'>
            <div className='content'>
                <h1 className='text-title'>Squizer Game</h1>
                <div className='content--body'>
                    {quizData}
                    <button onClick={submitAnswer} className='btn_submit'>Submit</button>
                </div>
            </div>
        </main>
    )
}