// Import necessary modules
import React, { createContext, useContext, useEffect, useReducer } from "react";

// 1 - Create a context
const QuizContext = createContext();

// 2 - Initial state
const initialState = {
  questions: [],
  status: "loading", // "loading" | "finished" | "error" | "ready" | "active"
  index: 0, // current question index
  answer: null, // user answer
  points: 0, // user points
  highscore: 0, // user highscore
  secondsRemaining: null, // set to null to avoid showing 0 on start
};

const SECS_PER_QUESTION = 30;

// 3 - Reducer function
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
        // We have state now on start so we can use it to calculate the seconds remaining
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
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
    case "finish":
      return {
        ...state,
        status: "finished", // change status to finished
        // If user points are higher than highscore, update highscore
        // else, keep highscore
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...state,
        status: "ready",
        index: 0,
        answer: null,
        points: 0,
      };
    case "tick":
      return {
        ...state,
        // decrement seconds remaining
        secondsRemaining: state.secondsRemaining - 1,
        // if seconds are 0, change status to finished
        status: state.secondsRemaining === 1 ? "finished" : state.status,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

// 4 - Create a provider
function QuizProvider({ children }) {
  // STATE
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  // DERIVED STATE
  const numQuestions = questions.length;
  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  // EFFECTS
  // Fetch data from API
  useEffect(() => {
    fetch("http://localhost:3001/questions")
      .then((response) => response.json())
      // send payload to reducer
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((error) => dispatch({ type: "dataFailed" }));
  }, []);

  // HANDLER FUNCTIONS

  // CONTEXT VALUE
  const contextValue = {
    questions,
    status,
    index,
    answer,
    points,
    highscore,
    secondsRemaining,
    numQuestions,
    maxPoints,
    dispatch,
  };

  return (
    <QuizContext.Provider value={contextValue}>{children}</QuizContext.Provider>
  );
}

// 5 - Create a custom hook
function useQuiz() {
  const context = useContext(QuizContext);

  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }

  return context;
}

// 6 - Export the context, provider and custom hook
export { QuizProvider, useQuiz };
