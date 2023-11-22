import QuizData from '../data/quiz'
import QuizCards from '../cards/quizCards'
import React from 'react'
export default function Main() {

    // const [answerObject, setAnswerObject] = React.useState([])
    // const [finish, setFinishQuiz] = React.useState(false)
    // const [result, setResult] = React.useState([])
    // const [totalScore, setTotalScore] = React.useState(0)

    // const [quiz, setQuiz] = React.useState(QuizData)

    // let quizDataArray = []
    // let choicesArray = []
    // for (let i = 0; i < quiz.length; i++) {
    //     const quizObject = quiz[i]
    //     for (let j = 0; j < quizObject.choices.length; j++) {
    //         choicesArray.push({
    //             id: quizObject.id,
    //             choice: quizObject.choices[j],
    //             isSelected: false
    //         })
    //     }
    //     quizDataArray.push({
    //         id: quizObject.id,
    //         question: quizObject.question,
    //         correct_answer: quizObject.correct_answer,
    //         choices: []
    //     })
    // }

    // for (let i = 0; i < quiz.length; i++) {
    //     const quizObject = quiz[i]
    //     const addObjAnswer = { id: quizObject.id, choice: quizObject.correct_answer, isSelected: false }
    //     choicesArray.splice(Math.floor(Math.random() * choicesArray.length), 0, addObjAnswer)
    // }

    // const newQuiz = quizDataArray.map(quizes => {
    //     const choice = choicesArray.filter(choice => choice.id === quizes.id)
    //     return { ...quizes, choices: choice }
    // })

    // const [quizInitiation, setQuizInitiation] = React.useState(newQuiz)

    // const quizData = quizInitiation.map(quizObj => {
    //     return (
    //         <QuizCards key={quizObj.id} finishQuiz={finish} resultQuiz={result} quiz={quizObj} setAnswer={addAnswer} />
    //     )
    // })

    // function addAnswer(questionObject) {
    //     const { id, question, choice } = questionObject

    //     const addObjectAnswer = {
    //         id: id,
    //         question: question,
    //         myAnswer: choice,
    //     }

    //     for (let i = 0; i < quizInitiation.length; i++) {
    //         const quizObjects = quizInitiation[i]
    //         if (quizObjects.id === id) {
    //             for (let j = 0; j < quizObjects.choices.length; j++) {
    //                 const choicesObject = quizObjects.choices[j]
    //                 if (choicesObject.choice === choice)
    //                     choicesObject.isSelected = true
    //                 else {
    //                     choicesObject.isSelected = false
    //                 }
    //             }
    //         }
    //     }

    //     const isAnswerExist = answerObject.some(answer => id === answer.id)
    //     if (isAnswerExist) {
    //         setAnswerObject(oldAnswer => oldAnswer.map(ans => {
    //             return ans.id === id ? { ...ans, myAnswer: choice } : ans
    //         }))
    //     }
    //     else {
    //         setAnswerObject(oldAnswer => [...oldAnswer, addObjectAnswer])
    //     }
    // }

    // function addResult(question) {
    //     const { id } = question
    //     const isExistResult = result.some(res => res.id === id)
    //     if (!isExistResult) {
    //         setResult(oldResults => [...oldResults, question])
    //     }
    // }

    // function submitAnswer() {
    //     setFinishQuiz(true)
    //     let currentScore = 0
    //     for (let i = 0; i < quizInitiation.length; i++) {
    //         for (let j = 0; j < answerObject.length; j++) {
    //             const quiz = quizInitiation[i]
    //             const myQuiz = answerObject[j]
    //             if (quiz.id === myQuiz.id) {
    //                 if (quiz.question === myQuiz.question) {
    //                     const isExist = result.some(res => res.id === quiz.id)
    //                     if (quiz.correct_answer === myQuiz.myAnswer) {
    //                         if (!isExist)
    //                             addResult({ id: myQuiz.id, isCorrect: true })
    //                         currentScore += 1
    //                     } else {
    //                         if (!isExist)
    //                             addResult({ id: quiz.id, isCorrect: false })
    //                     }
    //                 }
    //             }
    //         }
    //     }
    //     setTotalScore(currentScore)
    //     console.log(choicesArray)
    // }

    const [questionDataTriviaList, setQuestionDataTriviaList] = React.useState(QuizData)
    const [myAnswerObjectList, setObjectAnswerList] = React.useState([])
    const [isFinishQuiz, setIsFinishQuiz] = React.useState(false)
    const [resultQuizList, setResultQuizList] = React.useState([])
    const [totalScore, setTotalScore] = React.useState(0)

    // React.useEffect(() => {
    //     fetch("https://opentdb.com/api.php?amount=3&category=27&difficulty=easy&type=multiple")
    //         .then(response => response.json())
    //         .then(data => setQuestionDataTrivia(data.results))
    //     console.log("Initializing")
    // }, [])

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

    const [quizInitializer, setQuizInitializer] = React.useState(newQuizies)

    const quizCard = quizInitializer.map(quizies => {
        return <QuizCards
            key={quizies.questionId}
            questionId={quizies.questionId}
            quizies={quizies}
            handleClickMyAnswer={handleClickMyAnswer}
            isFinishQuiz={isFinishQuiz}
            resultQuizList={resultQuizList}
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
        const resultIsExist = resultQuizList.some(currentResults => currentResults.questionId === questionId)
        const quizObject = quizInitializer.find(quizObject => quizObject.questionId === questionId)
        if (resultIsExist) {
            if (quizObject.correct_answer === myAnswer) {
                setResultQuizList(currentResults => currentResults.map(result => {
                    return result.questionId === questionId ? { ...result, isCorrect: true } : result
                }))
            } else {
                setResultQuizList(currentResults => currentResults.map(result => {
                    return result.questionId === questionId ? { ...result, isCorrect: false } : result
                }))
            }
        } else {
            if (quizObject.correct_answer === myAnswer) {
                setResultQuizList(currentResults => [...currentResults, { questionId: questionId, isCorrect: true }])
            } else {
                setResultQuizList(currentResults => [...currentResults, { questionId: questionId, isCorrect: false }])
            }
        }
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
        myAnswerObjectList.map(answer => {
            console.log(answer.questionId + " " + answer.myAnswer)
        })
        console.log(totalScore)
    }

    return (
        <main className='main'>
            <div className='content'>
                <div className='title_holder'>
                    <h1 className='text--title'>Squizer Game</h1>
                    {/* {finish && <h4 className={totalScore >= 3 ? 'text--score_pass' : 'text--score_fail'}>{totalScore} over {quizInitiation.length}</h4>} */}
                </div>
                <div className='content--body'>
                    {/* {quizData} */}
                    {quizCard}
                    <button className='btn_submit' onClick={submitButton}>Submit</button>
                </div>
            </div>
        </main>
    )
}