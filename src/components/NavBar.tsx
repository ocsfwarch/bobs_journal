import { Link } from "react-router-dom";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const NavBar = () => {
  return (
    <nav>
      <section className="nav-display">
        <Link to="/" title="Home">
          <span className="nav-title">Bob's Journal</span>
        </Link>
        <Link to="/AddJournalItem" title="Add Journal Entry">
          <AddCircleIcon />
        </Link>
      </section>
    </nav>
  );
};

export default NavBar;
