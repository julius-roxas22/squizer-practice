import InCorrectAnswersCards from '../choices/incorrect_answers'
import ResultStatus from '../components/result-status'

export default function QuizCard(props) {
    return (
        <div className='card'>
            <div className='card--container'>
                <div className='question_holder'>
                    <p className='question_text'>{props.quizies.question}</p>
                    {props.isFinishQuiz && <ResultStatus
                        resultQuizList={props.resultQuizList}
                        questionId={props.quizies.questionId} />}
                </div>
                <InCorrectAnswersCards
                    quizies={props.quizies}
                    incorrectAnswers={props.quizies.incorrect_answers}
                    handleClickMyAnswer={props.handleClickMyAnswer} />
            </div>
        </div>
    )
}