import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

function Update() {
  const { id } = useParams();

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
    console.log(event.target.files[0]);
    setInputData({ ...inputData, image: event.target.files });
  };

  const [imageFile, setImageFile] = useState(null);

  const [inputData, setInputData] = useState({
    id: id,
    firstName: "",
    lastName: "",
    email: "",
    image: "",
  });

  let localstoragetoken = localStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8081/database/getprofile/${id}`, {
        headers: {
          Authorization: localstoragetoken,
        },
      })
      .then((res) => setInputData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const formData = new FormData();
  formData.append("firstName", inputData.firstName);  
  formData.append("lastName", inputData.lastName);  
  formData.append("email", inputData.email);  
  if (imageFile) {
    formData.append("image", imageFile);    
  }
  

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:8081/database/put/${id}`, formData, {
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
        alert("Data updated successfully");
        navigate("/table");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
        <div className="w-50 border bg-info text-black p-5">
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
            <label htmlFor="image">Image</label>
            <input
              type="file"
              name="image"
              className="form-control"
              accept=".jpg,.png,.jpeg"
              onChange={handleImageChange}
            />
          </div>
          <button
            className="btn btn-primary mt-3"
            type="submit"
            onClick={handleSubmit}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default Update;
