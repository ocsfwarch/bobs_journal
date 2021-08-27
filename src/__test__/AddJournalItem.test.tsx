import ReactDom from "react-dom";
import AddJournalItem from "../components/AddJournalItem";
import { act } from "react-dom/test-utils";

let container: any;
const addToJournal = async (date: string, time: string, content: string) => {};
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it("renders AddJournalItem without crashing", () => {
  act(() => {
    ReactDom.render(<AddJournalItem addToJournal={addToJournal} />, container);
  });
});
