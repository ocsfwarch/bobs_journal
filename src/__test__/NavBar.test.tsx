import ReactDom from "react-dom";
import NavBar from "../components/NavBar";
import { BrowserRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";

let container: any;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it("renders NavBar without crashing", () => {
  act(() => {
    ReactDom.render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>,
      container
    );
  });
});
