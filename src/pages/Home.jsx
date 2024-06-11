import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h3>Home</h3>
      <button>Sign In</button>
      <Link to={`/readtasks`}>
        <button>Read Tasks</button>
      </Link>
    </div>
  );
};

export default Home;
