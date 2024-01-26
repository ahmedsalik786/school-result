import React, { useEffect, useState } from "react";
import axios from "axios";
import html2pdf from "html2pdf.js";
import "./studentDetail.css";

function StudentDetails() {
  const [studentId, setStudentId] = useState();
  const [studentDetails, setStudentDetails] = useState(null);
  const [error, setError] = useState(null);
  const [studentList, setStudentList] = useState([]);
  const [flag, setFlag] = useState("Pass");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://sheetdb.io/api/v1/zvoy16yukk5k5`);
        setStudentList(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching student list. Please try again.");
      }
    };

    fetchData();
  }, []);

  const fetchStudentDetail = () => {
    setStudentDetails({});
    setError(null);

    const foundStudent = studentList.find(
      (student) => student.StudentID === studentId
    );

    if (foundStudent) {
      setStudentDetails(foundStudent);
    } else {
      setError("Student not found. Please enter a valid Student ID.");
    }
  };

  const handleDownloadPDF = () => {
    const element = document.getElementById("student-details-container");
    html2pdf(element);
  };

  useEffect(() => {
    // Update the flag state only when studentDetails changes
    if (studentDetails) {
      const isFailed = Object.values(studentDetails).some(
        (value) => value < 30
      );
      setFlag(isFailed ? "Failed" : "Pass");
    }
  }, [studentDetails]);

  return (
    <div id="student-details-container" className="student-details-container">
      <h2>Student Details</h2>
      <div className="input-container">
        <label>
          Enter Student ID:
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(String(e.target.value))}
          />
        </label>
        <button onClick={fetchStudentDetail}>Get Student Results</button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {!error && studentDetails && (
        <div className="student-details">
          <h3>Student ID: {studentDetails.StudentID}</h3>
          <p>Roll Number: {studentDetails.Roll}</p>
          <p>Name: {studentDetails.Name}</p>

          <div className="marks-table-container">
            <table className="marks-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Score</th>
                  <th>P/F</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(studentDetails).map(([key, value]) => {
                  const isFailed = value < 30;
                  if (
                    key !== "StudentID" &&
                    key !== "Name" &&
                    key !== "Roll" &&
                    key !== "total" &&
                    key !== "percentage" &&
                    key !== "Pass/Failed" &&
                    key !== "Remarks" &&
                    key !== "grade"
                  ) {
                    return (
                      <tr key={key} className={isFailed ? "failed-row" : ""}>
                        <td>{key}</td>
                        <td>{value}</td>
                        <td>{isFailed ? "F" : "P"}</td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
          <p style={{ fontWeight: "bolder" }}>
            Remarks :{studentDetails.Remarks}
          </p>
          <p>Total: {studentDetails.total}</p>
          <p>
            Percentage: {studentDetails.percentage}% - <span>{flag}</span>
          </p>
          <p>Grade: {studentDetails.grade}</p>
        </div>
      )}

      {!error && studentDetails && (
        <button className="downloadBtn" onClick={handleDownloadPDF}>
          Download as PDF
        </button>
      )}
    </div>
  );
}

export default StudentDetails;
