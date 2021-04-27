import * as React from "react";
import './TopNav.css';
import { withRouter, Link } from "react-router-dom";

const TopNav: React.FC<any> = (props) => {
  const { location } = props;
  console.log(location);
  return (
    <div className="container">
      <div className="navbar">
        <ul>
          <li>
            <Link to="/" className={`${location.pathname === "/"?'active':''}`}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/add" className={`${location.pathname === "/add"?'active':''}`}>
              Add
            </Link>
          </li>
          <li>
            <Link
              to="/add-w"
              className={`${location.pathname === "/add-w"?'active':''}`}
            >
              Add (W)
            </Link>
          </li>
          <li>
            <Link
              to="/sentiment"
              className={`${location.pathname === "/sentiment"?'active':''}`}
            >
              Sentiment
            </Link>
          </li>
          <li>
            <Link
              to="/sentiment-w"
              className={`${location.pathname === "/sentiment-w"?'active':''}`}
            >
              Sentiment (W)
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default withRouter(TopNav);
