import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import SetupAccount from "../pages/SetupAccount";
import Home from "../pages/Home";

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/setup" element={<SetupAccount />} />
        <Route
          path="/home"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;