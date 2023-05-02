import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./userLoginForm.css";

function UserLoginForm() {
  const [token, setToken] = useState();
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    let localstoragetoken = localStorage.getItem("token");
    console.log(localstoragetoken);

    let formData = {
      email: event.target[0].value,
      password: event.target[1].value,
    };
    //console.log(formData)
    axios
      .post("http://localhost:8081/user/login", formData)
      .then((res) => {
        if (
          res.data.message === "User doesn't exist" ||
          res.data.message === "User name and password do not match"
        ) {
          alert("Login failed");
          localStorage.setItem("token", "undefined");
        } else {
          console.log(res);
          localStorage.setItem("token", res.data.token);
          alert("Login successful");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="w-50 border bg-info text-black p-5">
        <form onSubmit={handleSubmit} method="POST">
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
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
              onChange={(e) =>
                setInputData({ ...inputData, password: e.target.value })
              }
            />
          </div>
          <button className="btn btn-primary mt-3" type="submit">
            Login
          </button>
          <Link to="/">
            <button className="btn btn-primary mt-3 register-button">
              User Registration Page
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default UserLoginForm;
