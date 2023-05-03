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
    image: ""
  });
  
  let localstoragetoken = localStorage.getItem('token');

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8081/database/getprofile/${id}`,{headers: {
        'Authorization': localstoragetoken,
        'Content-Type': 'multipart/form-data'
      }})
      .then((res) => setInputData(res.data))      
      .catch((err) => console.log(err));
  },[]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put("http://localhost:8081/database/put/" + id, inputData,{headers: {
        'Authorization': localstoragetoken,
        'Content-Type': 'application/json'
      }})
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
            <label htmlFor="image">Image</label>
            <input
              type="file"
              name="image"
              className="form-control"
              value={inputData.image}
              onChange={(e) =>
                setInputData({
                  ...inputData,
                  image: e.target.files[0],
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
