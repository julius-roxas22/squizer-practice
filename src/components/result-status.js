
const result = function Result(props) {
    const results = props.resultQuizList.map(result => {
        return (
            <div key={result.questionId}>
                {result.questionId === props.questionId && <p className={result.isCorrect ? "result_text--correct" : "result_text--incorrect"} >{result.isCorrect ? "Correct" : "Wrong"}</p>}
            </div>
        )
    })

    return (
        <div>
            {results}
        </div>
    )
}

export default result