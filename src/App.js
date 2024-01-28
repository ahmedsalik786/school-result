import "./App.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import { useState } from "react";

function App() {
  const [studentId, setStudentId] = useState();
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage studentId={studentId} setStudentId={setStudentId} />
          }
        />
        <Route
          path="/dashboard"
          element={
            <DashboardPage studentId={studentId} setStudentId={setStudentId} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
