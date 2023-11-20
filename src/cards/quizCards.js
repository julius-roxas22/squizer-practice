import InCorrectAnswersCards from '../choices/incorrect_answers'
import ResultStatus from '../components/result-status'

export default function QuizCard(props) {
    return (
        <div className='card'>
            <div className='card--container'>
                <div className='question_holder'>
                    <p className='question_text'>{props.quizies.question}</p>
                    {/* {props.finishQuiz && <ResultStatus resultQuiz={props.resultQuiz} id={props.quiz.id} />} */}
                </div>
                <InCorrectAnswersCards
                    choices={props.quizies.incorrect_answers}
                    question={props.quizies.question} id={props.quizies.questionId}
                 /**setAnswer={props.setAnswer}*/ />
            </div>
        </div>
    )
}