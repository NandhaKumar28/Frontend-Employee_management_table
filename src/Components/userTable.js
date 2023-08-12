import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import TableRow from "./userTableRow";

function Table() {
  const [data, setData] = useState([]);

  let localstoragetoken = localStorage.getItem('token') 

  useEffect(() => {
    axios
      .get("http://localhost:8081/database",{headers: {
        'Authorization': localstoragetoken,
        'Content-Type': 'application/json'
      }})
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  });
  return (
    <div className="container mt-5">
      <div>
        <Link to="/user-registartion" className="btn btn-primary">
          Form Page
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Profile Picture</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>            
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((each) => (
            <TableRow details={each} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
