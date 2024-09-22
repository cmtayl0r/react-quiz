import { useEffect, useState } from "react";

// Components
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";

function App() {
  useEffect(() => {
    fetch("http://localhost:3001/questions")
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
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
