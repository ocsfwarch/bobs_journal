import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { formatTime } from "../helpers/DateTime";

interface IProps {
  addToJournal: (date: string, time: string, content: string) => void;
}

const AddJournalItem: React.FC<IProps> = (props: IProps) => {
  const [journalEntry, setJournalEntry] = useState({
    date: "",
    time: "",
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

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    // Preventing the page from reloading
    event.preventDefault();

    // Save the user item
    props.addToJournal(
      journalEntry.date,
      formatTime(),
      journalEntry.content
    );

    history.push(`/`);
  };

  return (
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
        <button type="submit">Save</button>
      </form>
    </section>
  );
};

export default AddJournalItem;
