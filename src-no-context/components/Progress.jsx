function Progress({ index, numQuestions, maxPoints, currPoints, answer }) {
  return (
    <header className="progress">
      {/*
        // If no answer, this is false, so 0 is added to index
        // if answer, it is not null, increment index by 1
    */}
      <progress value={index + Number(answer !== null)} max={numQuestions} />
      <p>
        Question <strong>{index}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{currPoints}</strong> / {maxPoints} points
      </p>
    </header>
  );
}

export default Progress;
