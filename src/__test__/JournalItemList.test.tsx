import ReactDom from "react-dom";
import JournalItemList from "../components/JournalItemList";
import { act } from "react-dom/test-utils";

let container: any;
const removeFromJournal = (date: string, itemIndex: number) => {};
export interface IState {
  journal: {
    date: string;
    entries: { time: string; content: string }[];
  }[];
}

const journal: any = [];

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
    ReactDom.render(
      <JournalItemList
        journal={journal}
        removeFromJournal={removeFromJournal}
      />,
      container
    );
  });
});
