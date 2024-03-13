import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { auth, db } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const CampaignDetails = ({ campaigns }) => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        const fetchCampaign = async () => {
          const docRef = doc(db, "campaigns", id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setCampaign({ id: docSnap.id, ...docSnap.data() });
          } else {
            console.log("No such campaign!");
          }
        };

        fetchCampaign();
      } else {
        const localCampaign = campaigns.find(c => c.id.toString() === id);
        setCampaign(localCampaign);
      }
    });
  }, [id, campaigns]);

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
