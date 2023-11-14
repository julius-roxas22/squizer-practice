import check from '../icons/check.png'
export default function Choices(props) {
    const choices = props.choices.map((choice, index) => {

        let text
        if (choice.isSelected) {
            text = "btn--default_selected"
        } else {
            text = "btn--default_choice"
        }

        return (
            <button
                key={index}
                className={text}
                onClick={() => props.setAnswer(
                    { id: props.id, question: props.question, choice: choice.choice })}>
                {choice.choice}
            </button>
        )
    })

    return (
        <div className="choices--container">
            {choices}
        </div>
    )
}