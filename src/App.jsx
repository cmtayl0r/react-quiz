import { useEffect, useReducer, useState } from "react";

// Components
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";

const initialState = {
  questions: [],
  status: "loading", // "loading" | "finished" | "error" | "ready" | "active"
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload, // ret
        status: "ready", // return to ready state
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    default:
      throw new Error("Action unknown");
  }
  // switch (action.type) {
  //   case "FETCH_QUESTIONS_REQUEST":
  //     return { ...state, loading: true, error: null };
  //   case "FETCH_QUESTIONS_SUCCESS":
  //     return { ...state, loading: false, questions: action.payload };
  //   case "FETCH_QUESTIONS_FAILURE":
  //     return { ...state, loading: false, error: action.payload };
  //   default:
  //     return state;
  // }
}

function App() {
  // Reducer hook to manage state
  const [state, dispatch] = useReducer(reducer, initialState);

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
        <p>115</p>
        <p>Question</p>
      </Main>
    </div>
  );
}

export default App;
