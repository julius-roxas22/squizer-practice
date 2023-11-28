import check from '../icons/check.png'
export default function Choices(props) {
    const choices = props.incorrectAnswers.map((choice, index) => {

        //if the quiz is finish and if the correct answer is selected it should be change the background color of the button
        //and the rest is incorrect
        //if the correct is not selected it should be change the background color of the correct answer

        const choiceObj = props.findResult(choice.questionId)
        // const answersObj = props.findAnswer(choice.questionId)
        // let classNameStyle
        let classNameStyle = choice.isSelected ? "btn--default_selected" : "btn--default_choice"

        // if (props.isFinishQuiz) {
        //     if (answersObj.myAnswer === choice.incorrect_answer && choiceObj.isCorrect) {
        //         classNameStyle = "btn--correct_selected"
        //     } else if (answersObj.myAnswer === choice.incorrect_answer && !choiceObj.isCorrect) {
        //         classNameStyle = "btn--incorrect_selected"
        //     } else {
        //         classNameStyle = "btn--default_choice"
        //     }
        // } else {
        //     if (choice.isSelected) {
        //         classNameStyle = "btn--default_selected"
        //     } else {
        //         classNameStyle = "btn--default_choice"
        //     }
        // }

        return (
            <button
                disabled={props.isFinishQuiz}
                key={index}
                className={classNameStyle}
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