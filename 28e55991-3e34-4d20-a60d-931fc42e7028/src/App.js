import React, { useState } from "react";
import "./App.css";
import ResidentsList from "./Components/ResidentsList";
import Search from "./Components/Search";
import Error from "./Components/Error";
import "h8k-components";

const title = "Hacker Dormitory";
function App() {
  const [errorMessage, seterrorMessage] = useState("");
  const [residentialList, setresidentialList] = useState([]);
  return (
    <div className="App">
      <h8k-navbar header={title}></h8k-navbar>
      <div className="layout-column justify-content-center align-items-center w-50 mx-auto">
        <Search
          setresidentialList={setresidentialList}
          seterrorMessage={seterrorMessage}
        />
        {errorMessage && <Error errorMessage={errorMessage} />}
        <ResidentsList residentialList={residentialList} />
      </div>
    </div>
  );
}

export default App;
