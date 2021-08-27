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
    entries: { time: string; content: string }[];
  }[];
}

const App = () => {
  const [status, setStatus] = useState(""); // This contains the status information
  const [useLocalStorage, setUseLocalStorage] = useState(false);
  const [journal, setJournal] = useState<IState["journal"]>([]);

  // The purpose of this hook is to clear the status field
  // after 1 second.
  useEffect(() => {
    const timer = setTimeout(() => {
      updateStatus("");
    }, 1000);
    return () => clearTimeout(timer);
  }, [status]);

  // The purpose of this hook is to read localStorage for
  // any available journal entries. This is done once when the
  // app is first run.
  useEffect(() => {
    async function fetchJournalList() {
      const bStorageAvailable = await checkForLocalStorage();
      if (bStorageAvailable) {
        setUseLocalStorage(bStorageAvailable);
        const theJournal = await JSON.parse(
          localStorage.getItem("journal_entries")!
        );
        /*
        if (theJournal && theJournal.length > 1) {
          // Sort the top level entries
          theJournal.sort((a: any, b: any) => {
            let aDate = new Date(a.date);
            let bDate = new Date(b.date);
            return bDate.getTime() - aDate.getTime();
          });
          // Sort the journal entries
          sortedJournal = theJournal.map((item: any) => {
            const tempDate = item.date;
            console.log(`LEN = ${item.entries.length}`);
            if (item.entries.length > 1) {
              item.entries.sort((a: any, b: any) => {
                let aDate = new Date(`${tempDate}T${a.time}`);
                let bDate = new Date(`${tempDate}T${b.time}`);
                return bDate.getTime() - aDate.getTime();
              });
            }
            return item;
          });
        }
        */
        setJournal([...theJournal]);
      }
    }
    fetchJournalList();
  }, []);

  // The purpose of this hook is to update the local storage
  // when an entry is added to the journal.
  useEffect(() => {
    async function storeJournalList(bUseStorage: boolean, theList: any) {
      if (bUseStorage) {
        localStorage.setItem("journal_entries", JSON.stringify(theList));
      }
    }
    storeJournalList(useLocalStorage, journal);
  }, [journal, useLocalStorage]);

  const updateStatus = (strStatus: string) => {
    setStatus(strStatus);
  };

  const addToJournal = async (date: string, time: string, content: string) => {
    let bResults = false;
    const temp = journal.find((entry) => entry.date === date);
    if (temp) {
      temp.entries.push({ time: time, content: content });
      setJournal((previous) => [...previous]);
      bResults = true;
    } else {
      setJournal((previous) => [
        ...previous,
        {
          date: date,
          entries: [{ time: time, content: content }],
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
