import check from '../icons/check.png'
export default function Choices(props) {
    const choices = props.incorrectAnswers.map((choice, index) => {

        // let text
        // if (choice.isSelected) {
        //     text = "btn--default_selected"
        // } else {
        //     text = "btn--default_choice"
        // }

        return (
            <button
                disabled={props.isFinishQuiz}
                key={index}
                className={choice.isSelected ? 'btn--default_selected' : 'btn--default_choice'}
                onClick={() => props.handleClickMyAnswer(
                    {
                        questionId: props.quizies.questionId,
                        type: props.quizies.type,
                        difficulty: props.quizies.difficulty,
                        category: props.quizies.category,
                        question: props.quizies.question,
                        correct_answer: props.quizies.correct_answer,
                        myAnswer: choice.incorrect_answer,
                    })
                }>
                {choice.incorrect_answer}
            </button>
        )
    })

    return (
        <div className="choices--container">
            {choices}
        </div>
    )
}