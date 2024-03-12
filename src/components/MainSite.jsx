// src/components/MainSite.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './MainSite.css';

const MainSite = () => {
  return (
    <div className="main-site">
      <h1>Welcome to the Dungeon Master's Guide!</h1>
      <p>This is your one-stop hub for managing your D&D campaigns, organizing encounters, generating NPCs, and more.</p>
      
      <div className="features">
        <div className="feature-item">
          <h2>Campaign Organizer</h2>
          <p>Manage your campaigns, track progress, and keep all your notes organized.</p>
          <Link to="/campaign-organizer">Go to Campaign Organizer</Link>
        </div>

        {/* Placeholder for Encounter Builder - Update this when the component is ready */}
        <div className="feature-item">
          <h2>Encounter Builder</h2>
          <p>Plan your encounters, set up challenges, and prepare for battle.</p>
          <Link to="/encounter-builder">Go to Encounter Builder</Link>
        </div>

        {/* Placeholder for NPC Generator - Update this when the component is ready */}
        <div className="feature-item">
          <h2>NPC Generator</h2>
          <p>Create detailed NPCs quickly to populate your world with unique characters.</p>
          <Link to="/npc-generator">Go to NPC Generator</Link>
        </div>
      </div>
    </div>
  );
};

export default MainSite;
