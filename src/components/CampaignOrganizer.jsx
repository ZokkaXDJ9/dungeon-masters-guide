// src/components/CampaignOrganizer.jsx

import React, { useState } from 'react';

const CampaignOrganizer = () => {
  const [campaigns, setCampaigns] = useState([]);

  const addCampaign = () => {
    // Function to add a new campaign (we'll implement this later)
  };

  return (
    <div>
      <h2>Campaign Organizer</h2>
      <button onClick={addCampaign}>Add New Campaign</button>
      <div>
        {campaigns.map((campaign, index) => (
          <div key={index}>
            <h3>{campaign.title}</h3>
            <p>{campaign.description}</p>
            {/* Add more details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampaignOrganizer;
