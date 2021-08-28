import ReactDom from "react-dom";
import JournalItem from "../components/JournalItem";
import { act } from "react-dom/test-utils";

let container: any;
const removeFromJournal = (date: string, itemIndex: number) => {};
const entryDate = "2021-08-27";
const index = 0;
const item = { time: "00:00:00", ustime: "09:00AM", content: "this is a test" };

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it("renders JournalItem without crashing", () => {
  act(() => {
    ReactDom.render(
      <JournalItem
        key={entryDate}
        entryDate={entryDate}
        index={index}
        item={item}
        removeFromJournal={removeFromJournal}
      />,
      container
    );
  });
});
