import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Table from "../src/Components/userTable";
import Form from "../src/Components/addUserForm";
import Update from "../src/Components/updateUserForm";
import UserLoginForm from "../src/Components/userLoginForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/table" element={<Table />}></Route>
        <Route path="/user-registartion" element={<Form />}></Route>
        <Route path="/update/:id" element={<Update />}></Route>
        <Route path="/" element={<UserLoginForm />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
