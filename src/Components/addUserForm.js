import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import validationSchema from "../Validation/inputValidation";
import "./addUserForm.css";

function Form() {
  const [inputData, setInputData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  let localstoragetoken = localStorage.getItem("token");
  //console.log(localstoragetoken)

  const handleSubmit = async (event) => {
    event.preventDefault();

    let formData = {
      firstName: event.target[0].value,
      lastName: event.target[1].value,
      email: event.target[2].value,
      password: event.target[3].value,
      confirmPassword: event.target[4].value,
      image: inputData.image,
    };

    console.log(formData);

    const isValid = await validationSchema.isValid(formData);

    if (isValid) {
      axios
        .post("http://localhost:8081/database/post", formData, {
          headers: {
            Authorization: localstoragetoken,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if(res.data.message === 'Email already exists'){
            alert("Email already exists")
            return;
          }
          console.log(res);
          alert("Data posted successfully");
          navigate("/table");
        });
        
    } else {
      validationSchema
        .validate(formData, { abortEarly: false })
        .then(() => {
          setErrors({});
          axios
            .post("http://localhost:8081/database/post", formData, {
              headers: {
                Authorization: localstoragetoken,
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              alert("Data posted successfully");
              navigate("/table");
              window.location.reload(true) //Reloads the page on deletion of a record
            });
        })
        .catch((error) => {
          const newErrors = {};
          error.inner.forEach((err) => {
            newErrors[err.path] = err.message;
          });
          setErrors(newErrors);
        });
    }
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="w-50 border bg-info text-black p-5">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              className="form-control"
              onChange={(e) =>
                setInputData({ ...inputData, firstName: e.target.value })
              }
            />
            {errors.firstName && (
              <div className="text-danger">{errors.firstName}</div>
            )}
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              className="form-control"
              onChange={(e) =>
                setInputData({ ...inputData, lastName: e.target.value })
              }
            />
            {errors.lastName && (
              <div className="text-danger">{errors.lastName}</div>
            )}
          </div>
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
            {errors.email && <div className="text-danger">{errors.email}</div>}
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
            {errors.password && (
              <div className="text-danger">{errors.password}</div>
            )}
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              onChange={(e) =>
                setInputData({ ...inputData, confirmPassword: e.target.value })
              }
            />
            {errors.confirmPassword && (
              <div className="text-danger">{errors.confirmPassword}</div>
            )}
          </div>
          <div>
            <label htmlFor="image">Image</label>
            <input
              type="file"
              name="image"
              className="form-control"
              onChange={(e) =>
                setInputData({
                  ...inputData,
                  image: (e.target.files[0]),
                })
              }
            />
          </div>
          <button className="btn btn-primary mt-3">Submit</button>
        </form>
        <div>
          <Link to="/table">
            <button className="btn btn-primary mt-3">Table Page</button>
          </Link>
          <Link to="/login">
            <button className="btn btn-primary mt-3 login-button">
              Login Page
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Form;
