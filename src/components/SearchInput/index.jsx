import { Link } from "react-router-dom";
import "./search-input-styles.css";
import RightArrowIcon from "./RightArrowIcon";
import SearchIcon from "./SearchIcon";

export default function SearchInput({search, setSearch}) {
  return (
    <div className="search-input">
      <input type="search" placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)} />
      <SearchIcon className="search-icon" />
      <Link to={`/new`}>
        <button className="search-btn">
          <RightArrowIcon />
        </button>
      </Link>
    </div>
  );
}
