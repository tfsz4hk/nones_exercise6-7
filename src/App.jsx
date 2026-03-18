import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import SetupAccount from "../pages/SetupAccount";
import Home from "../pages/Home";

function App() {
  // Consume router location so this component re-renders on navigation,
  // ensuring `isLoggedIn` is re-read after login/setup updates localStorage.
  useLocation();
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
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
  );
}

export default App;