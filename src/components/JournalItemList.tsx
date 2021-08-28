/*
   The purpose of this component is to display a
   list of journal entries.
*/

import JournalItem from "./JournalItem";
import AddCircleIcon from "@material-ui/icons/AddCircle";

interface IProps {
  journal: {
    date: string;
    formatdate: string;
    entries: { time: string; ustime: string; content: string }[];
  }[];
  removeFromJournal: (date: string, index: number) => void;
}

const JournalItemList: React.FC<IProps> = (props: IProps) => {
  const renderList = (): JSX.Element[] => {
    if (props.journal && props.journal.length >= 1) {
      // Check if we need to sort the list
      if (props.journal && props.journal.length > 1) {
        // Sort the top level entries
        props.journal.sort((a: any, b: any) => {
          let aDate = new Date(a.date);
          let bDate = new Date(b.date);
          return bDate.getTime() - aDate.getTime();
        });
        // Sort the journal entries
        for (let item of props.journal) {
          if (item.entries && item.entries.length > 1) {
            item.entries.sort((a: any, b: any) => {
              let aDate = new Date(`${item.date}T${a.time}`);
              let bDate = new Date(`${item.date}T${b.time}`);
              return bDate.getTime() - aDate.getTime();
            });
          }
        }
      }
      return props.journal.map((entry) => {
        return (
          <li className="li-journal" key={entry.date}>
            <section>
              <header>{entry.formatdate}</header>
              <div className="">
                <ul className="ul-journal-entries">
                  {entry.entries.map((item, index) => {
                    return (
                      <JournalItem
                        key={`${entry.date}-${index}`}
                        entryDate={entry.date}
                        index={index}
                        item={item}
                        removeFromJournal={props.removeFromJournal}
                      />
                    );
                  })}
                </ul>
              </div>
            </section>
          </li>
        );
      });
    } else {
      return [
        <li className="li-journal-noentries" key="none">
          <span>There are no entries available</span>
          <p>
            Please select the <AddCircleIcon />
            at the top right of the application to add journal entries.
          </p>
        </li>,
      ];
    }
  };
  return (
    <section className="journal-container">
      <ul className="ul-journal">{renderList()}</ul>;
    </section>
  );
};

export default JournalItemList;
