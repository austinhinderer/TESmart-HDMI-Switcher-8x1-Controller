import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders app", () => {
  render(<App />);
  const buttonList = screen.getByTestId("buttons");
  const counter = screen.getByTestId("count");
  expect(buttonList).toBeInTheDocument();
  expect(buttonList.childNodes.length).toBe(8);
  expect(counter).toBeInTheDocument();
});
