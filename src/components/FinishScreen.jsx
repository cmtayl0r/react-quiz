function FinishScreen({ points, maxPoints, highScore }) {
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
      <p className="highscore">Highscore: {highScore} points</p>
    </>
  );
}

export default FinishScreen;
