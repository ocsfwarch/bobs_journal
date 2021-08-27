import ReactDom from "react-dom";
import Status from "../components/Status";
import { act } from "react-dom/test-utils";

let container: any;
let status: string = "this is a test";

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it("renders Status without crashing", () => {
  act(() => {
    ReactDom.render(<Status status={status} />, container);
  });
});
