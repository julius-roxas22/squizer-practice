import check from '../icons/check.png'
export default function Choices(props) {
    const choices = props.choices.map((choice, index) => {
        return (
            <button
                key={index}
                className={`btn_choice`}
                onClick={() => props.setAnswer({ id: props.id, question: props.question, choice: choice })}>
                {choice}
            </button>
        )
    })

    return (
        <div className="choices--container">
            {choices}
        </div>
    )
}