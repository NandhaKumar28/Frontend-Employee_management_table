import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { Link, useNavigate } from "react-router-dom";
import TableRow from "./userTableRow";

function Table() {
  const [data, setData] = useState([]);

   let localstoragetoken = localStorage.getItem('token')
   
  // console.log(localstoragetoken)

  // let headers = {
  //   'Content-Type':"application/json",
  //   'Authorization':`Bearer ${localstoragetoken}`
  // }

  const { people } = data;
  //console.log(data)
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:8081/database",{headers: {
        'Authorization': localstoragetoken,
        'Content-Type': 'application/json'
      }})
      .then((res) => {
        const { data } = res;
        // console.log(data)
        // console.log(res)
        setData(res.data);
      })
      .catch((err) => console.log(err));
  });
  return (
    <div className="container mt-5">
      <div>
        <Link to="/" className="btn btn-primary">
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
