import Choices from '../choices/choices'

export default function QuizCard(props) {
    return (
        <div className='card'>
            <div className='card--container'>
                <div className='question_holder'>
                    <p className='question_text'>{props.quiz.question}</p>
                    <p className='result_text'>Correct</p>
                </div>
                <Choices choices={props.quiz.choices} question={props.quiz.question} id={props.quiz.id} setAnswer={props.setAnswer} />
            </div>
        </div>
    )
}