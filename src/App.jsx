import { useState } from "react";

// Components
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";

function App() {
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
