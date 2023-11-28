import QuizData from '../data/quiz'
import QuizCards from '../cards/quizCards'
import React from 'react'
export default function Main() {

    const [questionDataTriviaList, setQuestionDataTriviaList] = React.useState(QuizData)
    // const [questionDataTriviaList, setQuestionDataTriviaList] = React.useState([])
    const [myAnswerObjectList, setObjectAnswerList] = React.useState([])
    const [isFinishQuiz, setIsFinishQuiz] = React.useState(false)
    const [totalScore, setTotalScore] = React.useState(0)

    // React.useEffect(() => {
    //     fetch("https://opentdb.com/api.php?amount=3&category=27&difficulty=easy&type=multiple")
    //         .then(response => response.json())
    //         .then(data => setQuestionDataTriviaList(data.results))
    // }, [])

    function reInitializeData() {

        let choicesArray = []
        let allQuizArray = []

        for (let i = 0; i < questionDataTriviaList.length; i++) {
            const id = generateId()
            const questionObject = questionDataTriviaList[i]
            for (let j = 0; j < questionObject.incorrect_answers.length; j++) {
                choicesArray.push({
                    questionId: id,
                    incorrect_answer: questionObject.incorrect_answers[j],
                    isSelected: false
                })
            }
            allQuizArray.push({
                questionId: id,
                type: questionObject.type,
                difficulty: questionObject.difficulty,
                category: questionObject.category,
                question: questionObject.question,
                correct_answer: questionObject.correct_answer,
                incorrect_answers: []
            })
        }

        for (let i = 0; i < allQuizArray.length; i++) {
            const quizObject = allQuizArray[i]
            const newObjectInCorrectAnswer = {
                questionId: quizObject.questionId,
                incorrect_answer: quizObject.correct_answer,
                isSelected: false
            }
            choicesArray.splice(Math.floor(Math.random() * choicesArray.length), 0, newObjectInCorrectAnswer)
        }

        const newQuizies = allQuizArray.map(quiz => {
            const choices = choicesArray.filter(choice => choice.questionId === quiz.questionId)
            return { ...quiz, incorrect_answers: choices }
        })

        let randomQuestions = []
        for (let i = 0; i < 10; i++) {
            let randomNumber = Math.floor(Math.random() * newQuizies.length)
            if (!randomQuestions.some(randQuestion => randQuestion.questionId === newQuizies[randomNumber].questionId)) {
                randomQuestions.push(newQuizies[randomNumber])
            }
        }
        return randomQuestions
    }

    const [quizInitializer, setQuizInitializer] = React.useState(reInitializeData())

    function autoReInitializedResult() {
        let resultArray = []
        for (let i = 0; i < quizInitializer.length; i++) {
            const data = quizInitializer[i]
            resultArray.push({ questionId: data.questionId, isCorrect: false })
        }
        return resultArray
    }

    const [resultQuizList, setResultQuizList] = React.useState(autoReInitializedResult())

    const quizCard = quizInitializer.map(quizies => {
        return <QuizCards
            key={quizies.questionId}
            questionId={quizies.questionId}
            quizies={quizies}
            handleClickMyAnswer={handleClickMyAnswer}
            isFinishQuiz={isFinishQuiz}
            resultQuizList={resultQuizList}
            findResult={findResult}
            findAnswer={findAnswer}
        />
    })

    function generateId() {
        let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
        let randCharacters = ""
        for (let i = 0; i < 7; i++) {
            let randomNumbers = Math.floor(Math.random() * characters.length);
            randCharacters += characters[randomNumbers]
        }
        return randCharacters
    }

    function handleClickMyAnswer(myAnswerObject) {

        //set the styles of choices
        setSelectedStyles(myAnswerObject)

        //add result in every question
        addResult(myAnswerObject)

        //add answer list
        addMyAnswer(myAnswerObject)
    }

    function setSelectedStyles(myAnswerObject) {
        const { questionId, myAnswer } = myAnswerObject
        const quizObj = quizInitializer.find(quizObject => quizObject.questionId === questionId)
        const selectedAnswer = quizObj.incorrect_answers.map(answer => {
            return answer.incorrect_answer === myAnswer ? { ...answer, isSelected: true } : { ...answer, isSelected: false }
        })
        setQuizInitializer(allQuizies => allQuizies.map(quiz => {
            return quiz.questionId === quizObj.questionId ? { ...quiz, incorrect_answers: selectedAnswer } : quiz
        }))
    }

    function addResult(myAnswerObject) {

        const { questionId, myAnswer } = myAnswerObject
        const resultObj = resultQuizList.find(currentResults => currentResults.questionId === questionId)
        const quizObject = quizInitializer.find(quizObject => quizObject.questionId === questionId)

        if (resultObj.questionId === quizObject.questionId) {
            if (quizObject.correct_answer === myAnswer) {
                setResultQuizList(oldResultList => oldResultList.map(result => {
                    return result.questionId === questionId ? { ...result, isCorrect: true } : result
                }))
            } else {
                setResultQuizList(oldResultList => oldResultList.map(result => {
                    return result.questionId === questionId ? { ...result, isCorrect: false } : result
                }))
            }
        }
    }

    function findAnswer(questionId) {
        return myAnswerObjectList.find(allAnswers => allAnswers.questionId === questionId)
    }

    function findResult(questionId) {
        return resultQuizList.find(result => result.questionId === questionId)
    }

    function addMyAnswer(myAnswerObject) {
        const { questionId, myAnswer } = myAnswerObject
        const myAnswerIsExist = myAnswerObjectList.some(currentAnswer => currentAnswer.questionId === questionId)
        if (myAnswerIsExist) {
            setObjectAnswerList(currentAnswers => currentAnswers.map(answer => {
                return answer.questionId === questionId ? { ...answer, myAnswer: myAnswer } : answer
            }))
        } else {
            setObjectAnswerList(currentAnswers => [...currentAnswers, myAnswerObject])
        }
    }

    function submitButton() {
        setIsFinishQuiz(true)
        let score = 0
        for (let i = 0; i < quizInitializer.length; i++) {
            const quizInitObject = quizInitializer[i]
            for (let j = 0; j < myAnswerObjectList.length; j++) {
                const myAnswerObj = myAnswerObjectList[j]
                if (quizInitObject.questionId === myAnswerObj.questionId) {
                    if (quizInitObject.correct_answer === myAnswerObj.myAnswer) {
                        score++
                    }
                }
            }
        }
        setTotalScore(score)
    }

    return (
        <main className='main'>
            <div className='content'>
                <div className='title_holder'>
                    <h1 className='text--title'>Quiz Game</h1>
                    {isFinishQuiz && <h4 className={totalScore >= (quizInitializer.length / 2) ? 'text--score_pass' : 'text--score_fail'}>{totalScore} over {quizInitializer.length}</h4>}
                </div>
                <div className='content--body'>
                    {quizCard}
                    <button disabled={isFinishQuiz} className='btn_submit' onClick={submitButton}>Submit</button>
                </div>
            </div>
        </main>
    )
}