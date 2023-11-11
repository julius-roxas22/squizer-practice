import Choices from '../choices/choices'
import ResultStatus from '../components/result-status'

export default function QuizCard(props) {
    return (
        <div className='card'>
            <div className='card--container'>
                <div className='question_holder'>
                    <p className='question_text'>{props.quiz.question}</p>
                    {props.finishQuiz && <ResultStatus resultQuiz={props.resultQuiz} id={props.quiz.id} />}
                </div>
                <Choices choices={props.quiz.choices} question={props.quiz.question} id={props.quiz.id} setAnswer={props.setAnswer} />
            </div>
        </div>
    )
}