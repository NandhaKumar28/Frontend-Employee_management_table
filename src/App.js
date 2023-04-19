import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Table from "./Table";
import Form from "./Form";
import Update from "./update";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/table" element={<Table />}></Route>
        <Route path="/" element={<Form />}></Route>
        <Route path="/update/:id" element={<Update />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
