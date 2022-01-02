import { Link } from "react-router-dom";

interface Props {
  title: string;
  icon: string;
}

const Navbar = ({ title, icon }: Props) => {
  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon} style={{ marginRight: "0.5rem" }} />
        {title}
      </h1>
      <ul>
        <li>
          <Link to="/">MyQuickBucks</Link>
        </li>
        <li>
          <Link to="/banks/explore">Explore</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </div>
  );
};

Navbar.defaultProps = {
  title: "Bank4Buck",
  icon: "fas fa-comment-dollar",
};

export default Navbar;
