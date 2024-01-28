import React from "react";
import StudentDetails from "../components/studentDetails/StudentDetails";

function DashboardPage({ studentId, setStudentId }) {
  return (
    <div>
      <StudentDetails studentId={studentId} setStudentId={setStudentId} />
    </div>
  );
}

export default DashboardPage;
