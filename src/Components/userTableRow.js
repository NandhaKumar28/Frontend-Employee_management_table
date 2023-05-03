import { Link } from "react-router-dom";
import axios from "axios";
import './userTableRow.css'

function TableRow(props) {
  //console.log(props);
  const { details } = props;
  const { ID, firstName, lastName, email, image_url } = details;
  let localstoragetoken = localStorage.getItem('token');

  return (
    <tr>
      <td>{ID}</td>
      <td>{<img src={image_url} alt="profile picture" className="profile-pic"/>}</td>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{email}</td>      
      <td>
        <Link
          className="text-decoration-none btn btn-success"
          to={`/update/${ID}`}
        >
          Update
        </Link>
        <button
          className="btn btn-danger ml-3 deletebtn"
          onClick={(e) => handleDelete(ID)}
        >
          Delete
        </button>
      </td>
    </tr>
  );

  function handleDelete(ID) {
    //console.log(ID)
    const confirm = window.confirm(
      "Are you sure?, Data will be deleted permanantly"
    );
    if (confirm) {
      axios
        .delete(`http://localhost:8081/database/delete/${ID}`,{headers: {
          'Authorization': localstoragetoken,
          'Content-Type': 'application/json'
        }})
        .then((res) => {
          alert("Record Deleted");
          window.location.reload(true) //Reloads the page on deletion of a record
        })
        .catch((error) => {
          console.log("Error deleting");
        });       
    } else {
      console.log("Delete cancelled");
    }
  }
}

export default TableRow;