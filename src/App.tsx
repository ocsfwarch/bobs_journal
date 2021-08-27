import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import JournalItemList from "./components/JournalItemList";
import AddJournalItem from "./components/AddJournalItem";
import Status from "./components/Status";
import { checkForLocalStorage } from "./helpers/Storage";

export interface IState {
  journal: {
    date: string;
    formatdate: string;
    entries: { time: string; ustime: string; content: string }[];
  }[];
}

const App = () => {
  const [status, setStatus] = useState(""); // This contains the status information
  const [journal, setJournal] = useState<IState["journal"]>([]);

  // The purpose of this hook is to clear the status field
  // after 2 second.
  useEffect(() => {
    const timer = setTimeout(() => {
      updateStatus("");
    }, 2000);
    return () => clearTimeout(timer);
  }, [status]);

  // The purpose of this hook is to read localStorage for
  // any available journal entries. This is done once when the
  // app is first run.
  useEffect(() => {
    async function fetchJournalList() {
      const bStorageAvailable = await checkForLocalStorage();
      if (bStorageAvailable) {
        const storageResults = localStorage.getItem("journal_entries");

        if (storageResults) {
          const theJournal = await JSON.parse(storageResults);
          if (theJournal && theJournal.length) {
            setJournal([...theJournal]);
          }
        }
      }
    }
    fetchJournalList();
  }, []);

  // The purpose of this hook is to update the local storage
  // when an entry is added to the journal.
  useEffect(() => {
    async function storeJournalList(theList: any) {
      const bUseStorage = await checkForLocalStorage();
      if (bUseStorage) {
        localStorage.setItem("journal_entries", JSON.stringify(theList));
      }
    }
    storeJournalList(journal);
  }, [journal]);

  const updateStatus = (strStatus: string) => {
    setStatus(strStatus);
  };

  const addToJournal = async (
    date: string,
    formatdate: string,
    time: string,
    ustime: string,
    content: string
  ) => {
    let bResults = false;
    const temp = journal.find((entry) => entry.date === date);
    if (temp) {
      temp.entries.push({ time: time, ustime: ustime, content: content });
      setJournal((previous) => [...previous]);
      bResults = true;
    } else {
      setJournal((previous) => [
        ...previous,
        {
          date: date,
          formatdate: formatdate,
          entries: [{ time: time, ustime: ustime, content: content }],
        },
      ]);
      bResults = true;
    }
    if (bResults) {
      setStatus(`The journal entry was added`);
    } else {
      setStatus(`ERROR: The journal entry was not added`);
    }
  };

  const removeFromJournal = (date: string, itemIndex: number) => {
    const temp = journal.find((entry) => entry.date === date);
    let bResults = false;
    if (temp) {
      const newEntries = temp.entries.filter((_, index) => index !== itemIndex);
      temp.entries = newEntries;

      // If there are no entries for a date, remove the journal date also
      if (!temp.entries.length) {
        const newJournal = journal.filter((entry) => entry.date !== date);
        setJournal([...newJournal]);
      } else {
        setJournal((previous) => [...previous]);
      }
      bResults = true;
    }
    if (bResults) {
      setStatus(`The journal entry was removed`);
    } else {
      setStatus(`ERROR: The journal entry was not removed`);
    }
  };

  return (
    <Router>
      <main className="app_container">
        <NavBar />
        <Status status={status} />
        <Switch>
          <Route path="/AddJournalItem">
            <AddJournalItem addToJournal={addToJournal} />
          </Route>
          <Route path="/">
            <JournalItemList
              journal={journal}
              removeFromJournal={removeFromJournal}
            />
          </Route>
        </Switch>
      </main>
    </Router>
  );
};

export default App;
