import Options from "./Options";

function Question({ question }) {
  console.log(question);
  return (
    <div>
      <h4>{question.question}</h4>
      <Options options={question.options} />
    </div>
  );
}

export default Question;
