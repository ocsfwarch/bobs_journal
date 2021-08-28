/*
   The purpose of this component is to display an
   individual journal entry.
*/

import { useState } from "react";
import { Button } from "@material-ui/core";

interface IProps {
  entryDate: string;
  index: number;
  item: { time: string; ustime: string; content: string };
  removeFromJournal: (date: string, index: number) => void;
}

const JournalItem: React.FC<IProps> = (props: IProps) => {
  const [showMore, setShowMore] = useState(false);
  const [itemId, setItemId] = useState("");
  const SHOWMOREBUTTON =
    props.item.content && props.item.content.length > 150 ? true : false;

  const handleDelete = (date: string, index: number) => {
    props.removeFromJournal(date, index);
  };

  const showDetails = async (key: string) => {
    setShowMore(!showMore);
    setItemId(key);
  };

  return (
    <li className="li-entries" key={`${props.item.time}-${props.index}`}>
      <div
        className={
          showMore && itemId === `${props.item.time}-${props.index}`
            ? "li-entry-content  li-entry-content-expand"
            : "li-entry-content"
        }
      >
        {props.item.ustime} - {props.item.content}
      </div>
      <footer>
        <span
          className={SHOWMOREBUTTON ? "show-more-display" : "show-more-hide"}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              showDetails(`${props.item.time}-${props.index}`);
            }}
          >
            {showMore && itemId === `${props.item.time}-${props.index}`
              ? "View Less"
              : "View More"}
          </Button>
        </span>
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => {
            handleDelete(props.entryDate, props.index);
          }}
        >
          Delete
        </Button>
      </footer>
    </li>
  );
};

export default JournalItem;
