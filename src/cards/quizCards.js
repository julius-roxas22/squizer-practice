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
                    <p className='question_text'>{props.quizies.question}</p>
                    {props.isFinishQuiz && <ResultStatus
                        resultQuizList={props.resultQuizList}
                        questionId={props.quizies.questionId} />}
                    <p className={quizType}>{props.quizies.difficulty}</p>
                </div>
                <InCorrectAnswersCards
                    isFinishQuiz={props.isFinishQuiz}
                    quizies={props.quizies}
                    incorrectAnswers={props.quizies.incorrect_answers}
                    handleClickMyAnswer={props.handleClickMyAnswer} />
            </div>
        </div>
    )
}