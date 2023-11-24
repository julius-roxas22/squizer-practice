import InCorrectAnswersCards from '../choices/incorrect_answers'
import ResultStatus from '../components/result-status'

export default function QuizCard(props) {

    let quizType
    switch (props.quizies.difficulty) {
        case "easy": {
            quizType = "easy"
            break
        }
        case "medium": {
            quizType = "medium"
            break
        }
        case "hard": {
            quizType = "hard"
            break
        }
    }

    return (
        <div className='card'>
            <div className='card--container'>
                <div className='question_holder'>
                    <p className={quizType}>{props.quizies.difficulty}</p>
                    <p className='question_text'>{props.quizies.question}</p>
                    {/* {props.isFinishQuiz && <p className='correct_answer'> {props.quizies.correct_answer} </p>} */}
                    <p className='correct_answer_text'> {props.quizies.correct_answer} </p>
                    {props.isFinishQuiz && <ResultStatus
                        resultQuizList={props.resultQuizList}
                        questionId={props.quizies.questionId} />}
                </div>
                <InCorrectAnswersCards
                    isFinishQuiz={props.isFinishQuiz}
                    quizies={props.quizies}
                    incorrectAnswers={props.quizies.incorrect_answers}
                    handleClickMyAnswer={props.handleClickMyAnswer}
                    findResult={props.findResult} />
            </div>
        </div>
    )
}