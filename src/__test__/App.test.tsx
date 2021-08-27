import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders the main application", () => {
  render(<App />);
  const linkElement = screen.getByText("Bob's Journal");
  expect(linkElement).toBeInTheDocument();
});
