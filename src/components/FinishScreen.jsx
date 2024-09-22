function FinishScreen({ points, maxPoints }) {
  const percentage = (points / maxPoints) * 100;
  return (
    <p className="result">
      You scored <strong>{points}</strong> out of <strong>{maxPoints}</strong> (
      {Math.ceil(percentage)}% correct)
    </p>
  );
}

export default FinishScreen;
