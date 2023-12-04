import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Task List</Link>
      </div>
    </header>
  );
}

export default Header;
