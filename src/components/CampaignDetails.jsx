import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { auth, db } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import './MainSite.css';

const CampaignDetails = ({ campaigns }) => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [npcs, setNpcs] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        const fetchCampaign = async () => {
          const docRef = doc(db, "campaigns", id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setCampaign({ id: docSnap.id, ...docSnap.data() });
            fetchNPCs(docSnap.id);
          } else {
            console.log("No such campaign!");
          }
        };

        fetchCampaign();
      } else {
        const localCampaign = campaigns.find(c => c.id.toString() === id);
        setCampaign(localCampaign);
        fetchNPCs(localCampaign.id);
      }
    });
  }, [id, campaigns]);

  const fetchNPCs = async (campaignId) => {
    if (auth.currentUser) {
      // User is online, fetch NPCs from Firestore
      const npcsRef = collection(db, "npcs");
      const q = query(npcsRef, where("campaignId", "==", campaignId));
      const querySnapshot = await getDocs(q);
      const npcsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNpcs(npcsData);
    } else {
      // User is offline, fetch NPCs from session storage
      const storedNpcs = JSON.parse(sessionStorage.getItem('npcs')) || [];
      const filteredNpcs = storedNpcs.filter(npc => npc.campaignId === campaignId);
      setNpcs(filteredNpcs);
    }
  };

  if (!campaign) {
    return <div>Campaign not found</div>;
  }

  const notes = Array.isArray(campaign.notes) ? campaign.notes : [];

  return (
    <div className='main-site'>
      <h2>{campaign.title}</h2>
      <p>{campaign.description}</p>
      <h3>Game Details</h3>
      <p><strong>Game Name:</strong> {campaign.gameName}</p>
      <p><strong>Next Session:</strong> {campaign.nextSession}</p>
      <h3>Notes</h3>
      <ul>
        {notes.map((note, index) => <li key={index}>{note}</li>)}
        <button style={{ width: '250px' }} onClick={() => navigate(`/note-editor/${campaign.id}`)}>Edit Notes</button>
      </ul>
      <h3>NPCs</h3>
      <ul>
        {npcs.map((npc, index) => (
          <li key={index}>
            <Link to={`/npcs/${npc.id}`}>{npc.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CampaignDetails;
