import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../asset/schoolLogo.png";
import "./Landing.css"; // Import your CSS file for styling

function Landing() {
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
        <Link to="/dashboard" className="btn">
          Check your Results
        </Link>
      </section>
    </div>
  );
}

export default Landing;
