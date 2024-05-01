import { BrowserRouter, Routes, Route } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.css'
import AdminPanel from "./components/AdminPanel.js"
import Login from "./components/Login.js"
import Register from "./components/Register.js"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminPanel/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
