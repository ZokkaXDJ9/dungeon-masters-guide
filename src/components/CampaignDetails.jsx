import React from 'react';
import { useParams } from 'react-router-dom';

const CampaignDetails = ({ campaigns }) => {
  let { id } = useParams();
  const campaign = campaigns.find(c => c.id === parseInt(id));

  if (!campaign) {
    return <div>Campaign not found</div>;
  }

  return (
    <div>
      <h2>{campaign.title}</h2>
      <p>{campaign.description}</p>
      <h3>Game Details</h3>
      <p><strong>Game Name:</strong> {campaign.gameName}</p>
      <p><strong>Next Session:</strong> {campaign.nextSession}</p>
      <h3>Fun Stats</h3>
      <p><strong>Monsters Slain:</strong> {campaign.stats ? campaign.stats.numberOfMonstersSlain : 'N/A'}</p>
      <p><strong>Treasure Collected:</strong> {campaign.stats ? campaign.stats.treasureCollected : 'N/A'}</p>
      <h3>Notes</h3>
      <ul>
        {campaign.notes.map((note, index) => <li key={index}>{note}</li>)}
      </ul>
    </div>
  );
};

export default CampaignDetails;