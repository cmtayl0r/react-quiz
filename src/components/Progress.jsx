// CONTEXT
import { useQuiz } from "../contexts/QuizContext";

function Progress() {
  const { index, numQuestions, maxPoints, points, answer } = useQuiz();

  return (
    <header className="progress">
      {/*
        // If no answer, this is false, so 0 is added to index
        // if answer, it is not null, increment index by 1
    */}
      <progress value={index + Number(answer !== null)} max={numQuestions} />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPoints} points
      </p>
    </header>
  );
}

export default Progress;
