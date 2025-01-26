import React, { useState } from "react";

const Display = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
  });

  const [submittedData, setSubmittedData] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(formData);
  };

  // Handle reset
  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      age: "",
    });
    setSubmittedData(null);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Data Entry Form</h1>

      {/* Data Entry Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{ marginLeft: "10px" }}
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{ marginLeft: "10px" }}
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Age:
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              style={{ marginLeft: "10px" }}
              required
            />
          </label>
        </div>
        <button type="submit" style={{ marginRight: "10px" }}>
          Submit
        </button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </form>

      {/* Data Display */}
      {submittedData && (
        <div>
          <h2>Submitted Data:</h2>
          <p>
            <strong>Name:</strong> {submittedData.name}
          </p>
          <p>
            <strong>Email:</strong> {submittedData.email}
          </p>
          <p>
            <strong>Age:</strong> {submittedData.age}
          </p>
        </div>
      )}
    </div>
  );
};

export default Display;
