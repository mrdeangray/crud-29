import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const Header = ({ className }) => {
  const {currUser} = useContext(AuthContext)
  return (
    <header className={className}>
      <h2>CRUD-29</h2>
      <ul>
        <li>Link1</li>
        <li>Link1</li>
        <li>Link1</li>
      </ul>
      <button>{currUser? currUser.displayName: "Sign In"}</button>
    </header>
  );
};

export default Header;
