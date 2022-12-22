import React, { useEffect, useState } from "react";

function App() {
  const [current, setCurrent] = useState(null);

  const getCurrent = () => {
    fetch("/api/current")
      .then((result) => result.json())
      .then((body) => setCurrent(body.current));
  };

  const setInput = (inputChannel) => {
    fetch(`/api/setInput/${inputChannel}`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        setCurrent(data.current);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const renderButtons = (inputCount) => {
    const buttons = [];

    for (let i = 0, len = inputCount; i < len; i++) {
      buttons.push(
        <button key={i} onClick={() => setInput(i + 1)}>
          {i + 1}
        </button>
      );
    }

    return buttons;
  };

  useEffect(() => {
    getCurrent();
  }, []);

  return (
    <div>
      <header data-testid="count">{current}</header>
      <div data-testid="buttons">{renderButtons(8)}</div>
    </div>
  );
}

export default App;
