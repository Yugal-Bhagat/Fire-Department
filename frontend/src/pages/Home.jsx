import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

// Reusable Section Heading Component
const SectionHeading = ({ title }) => (
  <h2 className="section-heading">{title}</h2>
);

// Reusable Button Component
const HomeButton = ({ to, className, children }) => (
  <Link to={to} className={`home-button ${className}`}>
    {children}
  </Link>
);

// Reusable Feature Card Component
const FeatureCard = ({ title, description }) => (
  <div className="feature-card">
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

// Reusable Process Step Component
const ProcessStep = ({ number, title, description }) => (
  <div className="process-step">
    <span className="step-number">{number}</span>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-heading">Fast & Secure Fire Department NOC Processing</h1>
          <p className="hero-subtext">
            Apply, track, and receive fire safety approvals in real time.
          </p>
          <div className="hero-buttons">
            <HomeButton to="/apply-noc" className="apply-button">
              Apply for NOC
            </HomeButton>
            <HomeButton to="/track-application" className="track-button">
              Track Application
            </HomeButton>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="features-section">
        <SectionHeading title="Key Features" />
        <div className="features-grid">
          <FeatureCard
            title="Automated NOC Issuance"
            description="No more paperwork, instant approvals."
          />
          <FeatureCard
            title="Real-Time Tracking"
            description="Monitor the status of your application live."
          />
          <FeatureCard
            title="Fire Safety Inspections"
            description="Easy scheduling & compliance monitoring."
          />
          <FeatureCard
            title="AI-Based Risk Analysis"
            description="Prioritizing applications based on risk level."
          />
          <FeatureCard
            title="Emergency Notifications"
            description="Instant alerts for pending approvals & inspections."
          />
          <FeatureCard
            title="Secure Document Upload"
            description="Aadhaar, PAN & Fire Safety Certificates verified instantly."
          />
        </div>
      </section>

      {/* Step-by-Step Process Section */}
      <section className="process-section">
        <SectionHeading title="How It Works?" />
        <div className="process-steps">
          <ProcessStep
            number="1"
            title="Submit NOC Application"
            description="Upload required documents."
          />
          <ProcessStep
            number="2"
            title="Review & Inspection"
            description="Admin verifies and schedules an inspection."
          />
          <ProcessStep
            number="3"
            title="Track Progress"
            description="Get real-time status updates."
          />
          <ProcessStep
            number="4"
            title="Approval & Compliance"
            description="Receive the final NOC certificate."
          />
        </div>
      </section>
    </div>
  );
};

export default Home;

