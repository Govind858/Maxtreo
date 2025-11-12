import React, { useState, useEffect } from 'react';
import './Register.css';
import NavBar from '../NavBar/NavBar';

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    date_of_birth: "",
    pin_code: "",
    age: "",
    district: "",
    state: "",
    address: "",
    role: "user"
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const formFields = [
    { id: "email", label: "EMAIL", type: "email", placeholder: "your@email.com" },
    { id: "password", label: "PASSWORD", type: "password", placeholder: "Your secure password" },
    { id: "first_name", label: "FIRST NAME", type: "text", placeholder: "John" },
    { id: "last_name", label: "LAST NAME", type: "text", placeholder: "Doe" },
    { id: "phone_number", label: "PHONE NUMBER", type: "tel", placeholder: "+1234567890" },
    { id: "date_of_birth", label: "DATE OF BIRTH", type: "date", placeholder: "" },
    { id: "pin_code", label: "PIN CODE", type: "text", placeholder: "123456" },
    { id: "age", label: "AGE", type: "number", placeholder: "25" },
    { id: "district", label: "DISTRICT", type: "text", placeholder: "Your district" },
    { id: "state", label: "STATE", type: "text", placeholder: "Your state" },
    { id: "address", label: "ADDRESS", type: "text", placeholder: "123 Cyber Street" }
  ];

  const progressPercentage = (currentStep / formFields.length) * 100;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const nextField = () => {
    if (currentStep < formFields.length) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsAnimating(false);
      }, 500);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsComplete(true);
    console.log("Form submitted:", formData);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (currentStep < formFields.length) {
        nextField();
      } else {
        handleSubmit(e);
      }
    }
  };

  // FIXED: Added formFields to dependencies
  useEffect(() => {
    const currentInput = document.getElementById(
      currentStep < formFields.length ? formFields[currentStep].id : null
    );
    if (currentInput) {
      currentInput.focus();
    }
  }, [currentStep, formFields]);

  return (
    <>
      <NavBar />
      <div className="register-container">
        {/* Left Panel */}
        <div className="brand-panel">
          <div className="brand-content">
            <div className="logo-container">
              <div className="logo-icon">
                <svg viewBox="0 0 50 50" width="80" height="80">
                  <circle cx="25" cy="25" r="20" fill="none" stroke="#e60000" strokeWidth="2" />
                  <path d="M15,25 L35,25" stroke="#e60000" strokeWidth="2" />
                  <path d="M25,15 L25,35" stroke="#e60000" strokeWidth="2" />
                </svg>
              </div>
              <h1 className="brand-title">NEO TOKYO</h1>
            </div>
            <div className="brand-tagline">
              <p>The future awaits. Register now to access the city of tomorrow.</p>
            </div>
            <div className="brand-decoration">
              <div className="decoration-line"></div>
              <div className="decoration-circle"></div>
              <div className="decoration-line"></div>
            </div>
            <div className="brand-features">
              <div className="feature-item">
                <div className="feature-icon">Check</div>
                <div className="feature-text">Advanced Cybernetic Integration</div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">Check</div>
                <div className="feature-text">Secure Identity Verification</div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">Check</div>
                <div className="feature-text">Full Access to Digital Metropolis</div>
              </div>
            </div>
          </div>
          <div className="brand-particles"></div>
          <div className="brand-scan-lines"></div>
        </div>

        {/* Right Panel */}
        <div className="form-panel">
          {isComplete ? (
            <div className="register-success">
              <h2 className="success-heading">REGISTRATION COMPLETE</h2>
              <div className="success-icon">
                <svg viewBox="0 0 24 24" width="100" height="100">
                  <path fill="none" stroke="#e60000" strokeWidth="2" d="M20,6 L9,17 L4,12" className="checkmark" />
                </svg>
              </div>
              <p className="success-message">
                Welcome to Neo Tokyo, {formData.first_name}. Your cybernetic journey begins now.
              </p>
              <button className="neo-button" onClick={() => window.location.href = '/'}>
                ENTER NEO TOKYO
              </button>
            </div>
          ) : (
            <div className="register-form-container">
              <h1 className="register-heading">REGISTRATION</h1>

              <div className="progress-container">
                <div className="progress-steps">
                  {formFields.map((_, index) => (
                    <div
                      key={`step-${index}`}
                      className={`progress-step ${index < currentStep ? 'completed' : ''} ${index === currentStep ? 'active' : ''}`}
                    >
                      {index < currentStep ? 'Check' : index + 1}
                    </div>
                  ))}
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
                </div>
                <div className="progress-text">
                  {currentStep < formFields.length ? (
                    <>Step {currentStep + 1} of {formFields.length}</>
                  ) : (
                    <>Review your information</>
                  )}
                </div>
              </div>

              <form className="register-form" onSubmit={handleSubmit}>
                {formFields.map((field, index) => (
                  <div
                    key={field.id}
                    className={`form-field ${index === currentStep ? 'active' : ''} 
                               ${index < currentStep ? 'completed' : ''} 
                               ${isAnimating && index === currentStep ? 'sliding-out' : ''}
                               ${isAnimating && index === currentStep + 1 ? 'sliding-in' : ''}`}
                    style={{ display: index === currentStep ? 'block' : 'none' }}
                  >
                    <label htmlFor={field.id} className="field-label">
                      {field.label}
                      <div className="label-line"></div>
                    </label>
                    <div className="input-group">
                      <input
                        id={field.id}
                        type={field.type}
                        value={formData[field.id]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        required
                        onKeyPress={handleKeyPress}
                        className="neo-input"
                        autoComplete={field.id === "password" ? "new-password" : "on"}
                      />
                      <button
                        type="button"
                        className="next-button"
                        onClick={nextField}
                        disabled={!formData[field.id]}
                      >
                        <span className="arrow">Arrow Right</span>
                      </button>
                    </div>
                  </div>
                ))}

                {currentStep >= formFields.length && (
                  <div className="submit-section">
                    <h3 className="review-heading">REVIEW YOUR DATA</h3>
                    <div className="data-review">
                      {formFields.map((field) => (
                        <div key={`review-${field.id}`} className="review-item">
                          <span className="review-label">{field.label}:</span>
                          <span className="review-value">
                            {field.id === "password"
                              ? "•".repeat(formData[field.id].length)
                              : formData[field.id]}
                          </span>
                        </div>
                      ))}
                    </div>
                    <button type="submit" className="submit-button">
                      <span className="submit-text">REGISTER</span>
                      <span className="submit-icon">Arrow Right</span>
                    </button>
                  </div>
                )}
              </form>
            </div>
          )}
          <div className="form-particles"></div>
          <div className="form-scan-lines"></div>
        </div>
      </div>
    </>
  );
}

export default Register;