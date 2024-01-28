import React, { useEffect, useState } from "react";
import axios from "axios";
import html2pdf from "html2pdf.js";
import "./studentDetail.css";
import Logo from "../../asset/schoolLogo.png";
import Loading from "./Loading";

function StudentDetails({ studentId, setStudentId }) {
  const [loading, setLoading] = useState(true);
  const [studentDetails, setStudentDetails] = useState(null);
  const [error, setError] = useState(null);
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://script.googleusercontent.com/macros/echo?user_content_key=iW_q4GaFf-lWdEK2kw6Iw65ny-tMG14Fuqelu0OoslXKbnviq4EQekFvpLZIR5DvDkV7_5h18jfqy0_x7orAVL1eRsurZoTlm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnITC2tXMWJULi4ih2AaCn5qYyh3fc1F3pATocEG-tW0dXrigxObLc924wTHbqfk1Dow8NoNqt2G-DR6GIAgnBJ0xBnWUEMeDNQ&lib=MTjz2KoLtIiMLh3NAW9o_G3Mvq-Peybp_`
        );
        // console.log(res.data.data);
        setStudentList(res.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching student list. Please try again.");
      }
    };

    fetchData();
  }, []);

  console.log("studentId", studentId);

  useEffect(() => {
    fetchStudentDetail();
  }, [studentList]);

  const fetchStudentDetail = () => {
    setStudentDetails(null);
    setError(null);

    const foundStudent = studentList.find(
      (student) => student.StudentID === Number(studentId)
    );

    if (foundStudent) {
      console.log("foundStudent", foundStudent);
      setLoading(false);
      setStudentDetails(foundStudent);
    } else {
      setError("Student not found. Please enter a valid Student ID.");
    }
  };

  const handleDownloadPDF = () => {
    const element = document.getElementById("student-details-container");
    const options = {
      margin: 10,
      filename: "student-details.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    html2pdf().from(element).set(options).save();
  };

  console.log("current", studentDetails);
  return (
    <>
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <div
            id="student-details-container"
            className="student-details-container"
          >
            <div className="header">
              <h2>Student Results</h2>
            </div>
            {/* <div className="input-container">
        <label>
          Enter Student ID:
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
        </label>
        <button onClick={fetchStudentDetail}>Get Student Results</button>
      </div> */}

            {error && <p className="error-message">{error}</p>}

            {!error && studentDetails && (
              <div className="student-details" id="student-details">
                <div className="idBox">
                  <img src={Logo} alt="Logo" className="logo" />

                  <div>
                    <h3> HOLY NAME HIGHER SECONDARY SCHOOL</h3>
                    <h3>Final Examination</h3>
                    <h3>Student ID: {studentDetails.StudentID}</h3>

                    <p>Roll Number: {studentDetails.Roll}</p>
                    <p>Name: {studentDetails.Name}</p>
                  </div>
                  <img
                    src={studentDetails.images}
                    alt=""
                    className="student-image"
                  />
                </div>

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
                      {studentDetails &&
                        Object.entries(studentDetails).map(([key, value]) => {
                          const isFailed = value < 30;
                          if (
                            key !== "StudentID" &&
                            key !== "Name" &&
                            key !== "Roll" &&
                            key !== "total" &&
                            key !== "percentage" &&
                            key !== "Pass/Failed" &&
                            key !== "Remarks" &&
                            key !== "grade" &&
                            key !== "images"
                          ) {
                            return (
                              <tr
                                key={key}
                                className={isFailed ? "failed-row" : ""}
                              >
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
                  Percentage: {studentDetails.percentage}% -{" "}
                  <span>
                    {studentDetails.percentage < 60 ? "Failed" : "Pass"}
                  </span>
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
        </>
      )}
    </>
  );
}

export default StudentDetails;
