// src/components/CampaignOrganizer.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal'; // Ensure you have a Modal component
import './CampaignOrganizer.css'; // Ensure your styles are imported

const CampaignOrganizer = ({ campaigns, setCampaigns }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCampaignTitle, setNewCampaignTitle] = useState('');
  const [newCampaignDescription, setNewCampaignDescription] = useState('');

  const addCampaign = () => {
    const newCampaign = {
      id: campaigns.length + 1,
      title: newCampaignTitle,
      description: newCampaignDescription,
      gameName: "Dungeon Crawl Classics",
      stats: {
        numberOfMonstersSlain: 0,  // Default value
        treasureCollected: "0 gold",  // Default value
      },
      nextSession: "Not scheduled",  // Default value
      notes: [],
    };
    setCampaigns([...campaigns, newCampaign]);
    setNewCampaignTitle('');
    setNewCampaignDescription('');
    setIsModalOpen(false);
  };

  return (
    <div className="campaign-grid">
      {campaigns.map((campaign) => (
        <Link key={campaign.id} to={`/campaign/${campaign.id}`} className="campaign-box">
          <h3>{campaign.title}</h3>
          {/* You can add more details to show in the box here */}
        </Link>
      ))}
      <div className="campaign-box add-new" onClick={() => setIsModalOpen(true)}>
        <h3>+ Add New Campaign</h3>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <input
          type="text"
          value={newCampaignTitle}
          onChange={(e) => setNewCampaignTitle(e.target.value)}
          placeholder="Campaign Title"
        />
        <textarea
          value={newCampaignDescription}
          onChange={(e) => setNewCampaignDescription(e.target.value)}
          placeholder="Campaign Description"
        />
        <button onClick={addCampaign}>Create Campaign</button>
      </Modal>
    </div>
  );
};

export default CampaignOrganizer;
