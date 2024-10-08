import { useQuiz } from "../contexts/QuizContext";

function FinishScreen() {
  const { points, maxPoints, highscore, dispatch } = useQuiz();

  const percentage = (points / maxPoints) * 100;

  let emoji;
  if (percentage === 100) {
    emoji = "🏅";
  } else if (percentage >= 80) {
    emoji = "🥳";
  } else {
    emoji = "👎";
  }
  return (
    <>
      <p className="result">
        {emoji} You scored <strong>{points}</strong> out of{" "}
        <strong>{maxPoints}</strong> ({Math.ceil(percentage)}% correct)
      </p>
      <p className="highscore">Highscore: {highscore} points</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Start again
      </button>
    </>
  );
}

export default FinishScreen;
