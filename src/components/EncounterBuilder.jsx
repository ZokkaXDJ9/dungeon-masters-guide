// src/components/EncounterBuilder.jsx
import React, { useState } from 'react';
import './EncounterBuilder.css';


const EncounterBuilder = () => {
  // Placeholder state - eventually this will be fetched from your database
  const [monsters, setMonsters] = useState([]);

  return (
    <div className="encounter-builder">
          <div className="main-site">
      <h1>Encounter Builder</h1>
      <p>Plan and manage your encounters by adding monsters and setting the scene for your next adventure.</p>
      <p>Is currently under development!</p>
      </div>
      {/* List monsters here */}
      <div className="monster-list">
        {monsters.map((monster, index) => (
          <div key={index} className="monster-item">
            <h2>{monster.name}</h2>
            {/* Add more monster details */}
          </div>
        ))}
      </div>

      {/* Form to add monsters will go here */}
      <div className="add-monster-form">
        {/* Implement form */}
      </div>
    </div>
  );
};

export default EncounterBuilder;
