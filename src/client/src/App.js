import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  const [current, setCurrent] = useState(null);

  const getAssociations = () => {
    fetch("/api/current")
      .then((result) => result.json())
      .then((body) => setCurrent(body.current));
  };

  useEffect(() => {
    getAssociations();
  }, []);

  return (
    <div className="App">
      <header className="App-header">{current}</header>
    </div>
  );
}

export default App;
