import { useEffect, useReducer, useState } from "react";

// Components
import Header from "./components/Header";
import Main from "./components/Main";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Loader from "./components/Loader";
import Error from "./components/Error";
import Progress from "./components/Progress";

const initialState = {
  questions: [],
  status: "loading", // "loading" | "finished" | "error" | "ready" | "active"
  index: 0, // current question index
  answer: null, // user answer
  points: 0, // user points
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload, // return data from API
        status: "ready", // return to ready state
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
      };
    case "newAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        // add points if answer is correct
        points:
          action.payload === question.correctOption // check if answer is correct
            ? state.points + question.points // if correct, add question points
            : state.points, // if wrong, return points
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1, // move to next question
        answer: null, // reset answer
      };
    default:
      throw new Error("Action unknown");
  }
}

function App() {
  // Reducer hook to manage state
  // state is destructured immediately to get the current values
  const [{ questions, status, index, answer, points }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const numQuestions = questions.length;
  const maxPoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );

  // Fetch data from API
  useEffect(() => {
    fetch("http://localhost:3001/questions")
      .then(response => response.json())
      // send payload to reducer
      .then(data => dispatch({ type: "dataReceived", payload: data }))
      .catch(error => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index + 1}
              numQuestions={numQuestions}
              maxPoints={maxPoints}
              currPoints={points}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton dispatch={dispatch} answer={answer} />
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
