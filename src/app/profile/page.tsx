"use client";

import React, { useState, useEffect } from 'react';

// Reusable style for input fields and buttons
const inputStyle = {
  fontSize: '24px',
  padding: '5px',
  marginBottom: '10px',
  width: '50%',
  maxWidth: '300px',
  border: '2px solid #ccc',
  borderRadius: '5px',
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  marginTop: '20px',
  fontSize: '18px',
  borderRadius: '5px',
};

// ToDo: 
// Settings to add - Name, Email, Phone Number, Address, Resume, Skills, Job Preferences

export default function ProfilePage() {
  return (
    <div 
      style={{
        padding: '20px', 
        fontFamily: 'Arial, sans-serif', 
        textAlign: 'center', // Center the text horizontally
      }}
    >
      {/* Editable text fields and corresponding save buttons */}
      <h2>Name:</h2>
      <input
        type="text"

        style={inputStyle}
      />
      <button style={buttonStyle}>Save Name</button>

      <h2>Email:</h2>
      <input
        type="text"
        style={inputStyle}
      />
      <button style={buttonStyle}>Save Email</button>

      <h2>Phone Number:</h2>
      <input
        type="text"
        style={inputStyle}
      />
      <button style={buttonStyle}>Save Phone Number</button>

      <h2>Address:</h2>
      <input
        type="text"
        style={inputStyle}
      />
      <button style={buttonStyle}>Save Address</button>

      <h2>Resume:</h2>
      {/* File upload input for resume */}
      <input
        type="file"
        accept="application/pdf"
        style={{ marginBottom: '10px' }}
      />

      <h2>Skills:</h2>
      <input
        type="text"
        style={inputStyle}
      />
      <button style={buttonStyle}>Save Skills</button>

      <h2>Job Preferences:</h2>
      <input
        type="text"
        style={inputStyle}
      />
      <button style={buttonStyle}>Save Job Preferences</button>
    </div>
  );
};

