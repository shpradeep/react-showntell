import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import './App.css';

const App: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('male');
  const [birthDate, setBirthDate] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const patientData = {
      resourceType: "Patient",
      name: [{ given: [firstName], family: lastName }],
      gender: gender,
      birthDate: birthDate
    };

    try {
      const response = await axios.post('http://hapi.fhir.org/baseR4/Patient', patientData, {
        headers: { 'Content-Type': 'application/fhir+json' }
      });
      console.log('Patient registered:', response.data);
      alert('Patient registered successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to register patient.');
    }
  };

  return (
    <div className="container">
      <h2>Register New Patient</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <br />
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <br />
        <label htmlFor="gender">Gender:</label>
        <select
          id="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <br />
        <label htmlFor="birthDate">Birth Date:</label>
        <input
          type="date"
          id="birthDate"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          required
        />
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Patient;
