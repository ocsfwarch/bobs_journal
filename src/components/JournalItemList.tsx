import { Button } from "@material-ui/core";
import { formatDate } from "../helpers/DateTime";

interface IProps {
  journal: {
    date: string;
    entries: { time: string; content: string }[];
  }[];
  removeFromJournal: (date: string, index: number) => void;
}

const JournalItemList: React.FC<IProps> = (props: IProps) => {
  const handleDelete = (date: string, index: number) => {
    props.removeFromJournal(date, index);
  };

  const renderList = (): JSX.Element[] => {
    // Check if we need to sort the list
    if (props.journal && props.journal.length > 1) {
      // Sort the top level entries
      props.journal.sort((a: any, b: any) => {
        let aDate = new Date(a.date);
        let bDate = new Date(b.date);
        return bDate.getTime() - aDate.getTime();
      });
    }
    return props.journal.map((entry) => {
      return (
        <li className="li-journal" key={entry.date}>
          <section>
            <header>{formatDate(entry.date)}</header>
            <div className="">
              <ul className="ul-journal-entries">
                {entry.entries.map((item, index) => {
                  return (
                    <li className="li-entries" key={`${item.time}-${index}`}>
                      <div className="li-entry-content">
                        {item.time}-{item.content}
                      </div>
                      <footer>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={(e) => {
                            handleDelete(entry.date, index);
                          }}
                        >
                          Delete
                        </Button>
                      </footer>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        </li>
      );
    });
  };
  return (
    <section className="journal-container">
      <ul className="ul-journal">{renderList()}</ul>;
    </section>
  );
};

export default JournalItemList;
