import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

function Update() {
  const { id } = useParams();

  const [inputData, setInputData] = useState({
    id: id,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8081/database/put/" + id)
      .then((res) => setInputData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put("http://localhost:8081/database/put/" + id, inputData)
      .then((res) => {
        alert("Data updated successfully");
        navigate("/table");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
        <div className="w-50 border bg-info text-black p-5">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="id">ID</label>
              <input
                type="number"
                disabled
                name="id"
                className="form-control"
                value={inputData.id}
              />
            </div>
            <div>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                className="form-control"
                value={inputData.firstName}
                onChange={(e) =>
                  setInputData({ ...inputData, firstName: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                className="form-control"
                value={inputData.lastName}
                onChange={(e) =>
                  setInputData({ ...inputData, lastName: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={inputData.email}
                onChange={(e) =>
                  setInputData({ ...inputData, email: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={inputData.password}
                onChange={(e) =>
                  setInputData({ ...inputData, password: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="form-control"
                value={inputData.confirmPassword}
                onChange={(e) =>
                  setInputData({
                    ...inputData,
                    confirmPassword: e.target.value,
                  })
                }
              />
            </div>
            <button className="btn btn-primary mt-3">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Update;
