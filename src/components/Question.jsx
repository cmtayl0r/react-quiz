import Options from "./Options";
import { useQuiz } from "../contexts/QuizContext";

function Question() {
  const { index, questions } = useQuiz();

  // Get the question at the current index
  const question = questions.at(index);

  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} />
    </div>
  );
}

export default Question;
