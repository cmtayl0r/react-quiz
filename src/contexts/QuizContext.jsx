// Import necessary modules
import React, { createContext, useContext, useState } from "react";

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

// 3 - Reducer function

// 4 - Create a provider
function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
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
