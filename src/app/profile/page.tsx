"use client";

import React, { useState, useEffect } from 'react';

const EditableText: React.FC = () => {
  // Initialize state for each editable text field
  const savedText1 = localStorage.getItem('editableText1') || '';
  const savedText2 = localStorage.getItem('editableText2') || '';
  const savedText3 = localStorage.getItem('editableText3') || '';
  const savedText4 = localStorage.getItem('editableText4') || '';
  const savedText5 = localStorage.getItem('editableText5') || '';
  const savedText6 = localStorage.getItem('editableText6') || '';
  const savedText7 = localStorage.getItem('editableText7') || '';
  const savedResume = localStorage.getItem('resumeFile') || '';

  const [text1, setText1] = useState(savedText1);
  const [text2, setText2] = useState(savedText2);
  const [text3, setText3] = useState(savedText3);
  const [text4, setText4] = useState(savedText4);
  const [text5, setText5] = useState(savedText5);
  const [text6, setText6] = useState(savedText6);
  const [text7, setText7] = useState(savedText7);
  const [resume, setResume] = useState(savedResume);

  // Handle text change for each editable field
  const handleTextChange1 = (event: React.ChangeEvent<HTMLInputElement>) => setText1(event.target.value);
  const handleTextChange2 = (event: React.ChangeEvent<HTMLInputElement>) => setText2(event.target.value);
  const handleTextChange3 = (event: React.ChangeEvent<HTMLInputElement>) => setText3(event.target.value);
  const handleTextChange4 = (event: React.ChangeEvent<HTMLInputElement>) => setText4(event.target.value);
  const handleTextChange5 = (event: React.ChangeEvent<HTMLInputElement>) => setText5(event.target.value);
  const handleTextChange6 = (event: React.ChangeEvent<HTMLInputElement>) => setText6(event.target.value);
  const handleTextChange7 = (event: React.ChangeEvent<HTMLInputElement>) => setText7(event.target.value);

  // Save text to localStorage for each field
  const saveText1 = () => { localStorage.setItem('editableText1', text1); alert('Name saved!'); };
  const saveText2 = () => { localStorage.setItem('editableText2', text2); alert('Email saved!'); };
  const saveText3 = () => { localStorage.setItem('editableText3', text3); alert('Phone Number saved!'); };
  const saveText4 = () => { localStorage.setItem('editableText4', text4); alert('Address saved!'); };
  const saveText5 = () => { localStorage.setItem('editableText5', text5); alert('Skills saved!'); };
  const saveText6 = () => { localStorage.setItem('editableText6', text6); alert('Job Preferences saved!'); };
  const saveText7 = () => { localStorage.setItem('editableText7', text7); alert('Job Preferences saved!'); };

  // Handle resume file upload
  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      // Save the file URL in localStorage (could be a Blob URL or file name)
      const fileURL = URL.createObjectURL(file); // Create a Blob URL for the uploaded file
      setResume(fileURL);
      localStorage.setItem('resumeFile', fileURL);
      alert('Resume uploaded successfully!');
    } else {
      alert('Please upload a PDF file.');
    }
  };

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
        value={text1}
        onChange={handleTextChange1}
        style={inputStyle}
      />
      <button onClick={saveText1} style={buttonStyle}>Save Name</button>

      <h2>Email:</h2>
      <input
        type="text"
        value={text2}
        onChange={handleTextChange2}
        style={inputStyle}
      />
      <button onClick={saveText2} style={buttonStyle}>Save Email</button>

      <h2>Phone Number:</h2>
      <input
        type="text"
        value={text3}
        onChange={handleTextChange3}
        style={inputStyle}
      />
      <button onClick={saveText3} style={buttonStyle}>Save Phone Number</button>

      <h2>Address:</h2>
      <input
        type="text"
        value={text4}
        onChange={handleTextChange4}
        style={inputStyle}
      />
      <button onClick={saveText4} style={buttonStyle}>Save Address</button>

      <h2>Resume:</h2>
      {/* File upload input for resume */}
      <input
        type="file"
        accept="application/pdf"
        onChange={handleResumeUpload}
        style={{ marginBottom: '10px' }}
      />
      {/* Display uploaded resume link */}
      {resume && (
        <div>
          <p>Uploaded Resume: <a href={resume} target="_blank" rel="noopener noreferrer">View Resume</a></p>
        </div>
      )}

      <h2>Skills:</h2>
      <input
        type="text"
        value={text6}
        onChange={handleTextChange6}
        style={inputStyle}
      />
      <button onClick={saveText6} style={buttonStyle}>Save Skills</button>

      <h2>Job Preferences:</h2>
      <input
        type="text"
        value={text7}
        onChange={handleTextChange7}
        style={inputStyle}
      />
      <button onClick={saveText7} style={buttonStyle}>Save Job Preferences</button>
    </div>
  );
};

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

export default EditableText;
