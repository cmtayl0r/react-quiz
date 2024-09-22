function NextButton({ dispatch, answer, index, numQuestions }) {
  // if no answer, return null to hide button
  if (answer === null) {
    return null;
  }
  // if not last question, show Next button
  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  // if last question, show Finish button
  if (index === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
}
export default NextButton;
