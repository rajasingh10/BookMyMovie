import React from "react";
import "../styles/AdminCard.css";
import { Link } from "react-router-dom";

const AdminCard = ({ name, route }) => {
  return (
    <Link to={route} className="adminLink">
      <div className="adminCard">
        <h1>{name}</h1>
      </div>
    </Link>
  );
};

export default AdminCard;
