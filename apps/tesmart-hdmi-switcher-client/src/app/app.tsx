import React, { useEffect, useState } from "react";

function App() {
    const [current, setCurrent] = useState(null);

    const getCurrent = async () => {
      const url = "//localhost:3000/api/current";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        setCurrent(json.current);

      } catch (e: any) {
        console.error(e.message);
      }
    };

    const setInput = async (inputChannel: string) => {
      const url = `//localhost:3000/api/setInput/${inputChannel}`;
      try {
        const response = await fetch(url, { method: "POST" });
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        setCurrent(json.current);
      } catch (e: any) {
        console.error(e.message);
      }
    };

    const renderButtons = (inputCount: number) => {
        const buttons = [];

        for (let i = 0, len = inputCount; i < len; i++) {
            buttons.push(
                <button key={i} onClick={() => setInput(`${i + 1}`)}>
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
