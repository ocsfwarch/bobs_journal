import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  today,
  formatDate,
  formatTime,
  formatUSTime,
} from "../helpers/DateTime";
import { Button } from "@material-ui/core";

interface IProps {
  addToJournal: (
    date: string,
    formatdate: string,
    time: string,
    ustime: string,
    content: string
  ) => void;
}

const TODAY = today();

const AddJournalItem: React.FC<IProps> = (props: IProps) => {
  const [journalEntry, setJournalEntry] = useState({
    date: TODAY,
    formatdate: "",
    time: "",
    ustime: "",
    content: "",
  });

  const history = useHistory();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setJournalEntry({
      ...journalEntry,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = () => {
    // Save the user item
    props.addToJournal(
      journalEntry.date,
      formatDate(journalEntry.date),
      formatTime(),
      formatUSTime(),
      journalEntry.content
    );

    history.push(`/`);
  };

  return (
    <div className="form-container">
      <section className="form-section">
        <h1>Add a Journal Entry</h1>
        <form onSubmit={submitForm}>
          <label htmlFor="date">Entry Date: </label>
          <input
            type="date"
            placeholder="MM-DD-YYYY"
            pattern="\d{2}-\d{2}-\d{4}"
            name="date"
            id="date"
            value={journalEntry.date}
            onChange={handleChange}
            required
          />
          <label htmlFor="content">Entry Content:</label>
          <textarea
            name="content"
            id="content"
            onChange={handleChange}
            required
          ></textarea>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              submitForm();
            }}
          >
            Save
          </Button>
        </form>
      </section>
    </div>
  );
};

export default AddJournalItem;
