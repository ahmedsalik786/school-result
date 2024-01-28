import React from "react";
import Landing from "../components/landing/Landing";

function LandingPage({ studentId, setStudentId }) {
  return (
    <div>
      <Landing studentId={studentId} setStudentId={setStudentId} />
    </div>
  );
}

export default LandingPage;
