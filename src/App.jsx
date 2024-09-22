import { useEffect, useReducer, useState } from "react";

// Components
import Header from "./components/Header";
import Main from "./components/Main";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import Loader from "./components/Loader";
import Error from "./components/Error";

const initialState = {
  questions: [],
  status: "loading", // "loading" | "finished" | "error" | "ready" | "active"
  index: 0, // current question index
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
    default:
      throw new Error("Action unknown");
  }
}

function App() {
  // Reducer hook to manage state
  // state is destructured to question, status, index variables
  const [{ questions, status, index }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const numQuestions = questions.length;

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
        {status === "active" && <Question question={questions[index]} />}
      </Main>
    </div>
  );
}

export default App;
