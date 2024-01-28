import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../asset/schoolLogo.png";
import "./Landing.css"; // Import your CSS file for styling

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Landing({ studentId, setStudentId }) {
  const [show, setShow] = useState(false);
  const naviagte = useNavigate();

  const handleClose = () => {
    setShow(false);
  };

  function handleSubmit() {
    naviagte("/dashboard");
  }
  console.log("studentId", studentId);
  const handleShow = () => setShow(true);
  return (
    <div className="landing-page">
      <header>
        <h2>Welcome to</h2>
        <h1> HOLY NAME HIGHER SECONDARY SCHOOL</h1>
        <p>Unlocking the Potential of Every Student</p>
      </header>

      <section className="animated-section">
        <div className="animation-box">
          <img className="logo" src={Logo} alt="School Logo" />
        </div>
        <p>Explore a World of Learning</p>
      </section>

      <section className="about-us-section">
        <h2>About Us</h2>
        <p>
          We don't just teach subjects; we nurture leaders, thinkers, and doers.
          Your journey with us is a preparation for a future where you're not
          just a part of the workforce but a leader driving change. 🌍💼
        </p>
      </section>

      <section className="admissions-section">
        <h2>Admissions Open</h2>
        <p>Enroll your child today for a bright future.</p>
        {/* <Link to="/dashboard" className="btn">
          Check your Results
        </Link> */}
      </section>

      <div className="popup">
        <>
          <Button variant="primary" onClick={handleShow}>
            Check your Results
          </Button>

          <Modal show={show} onHide={handleClose}>
            {/* <Modal.Header closeButton>
              <Modal.Title>Enter</Modal.Title>
            </Modal.Header> */}
            <Modal.Body>
              <input
                onChange={(e) => setStudentId(e.target.value)}
                type="number"
                name=""
                placeholder="Enter Student Id"
                id=""
              />
              <input type="text" name="" id="" placeholder="Enter name" />
            </Modal.Body>
            <Modal.Footer className="footer">
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>

              <Button onClick={handleSubmit} className="btn" variant="primary">
                Search
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      </div>
    </div>
  );
}

export default Landing;
