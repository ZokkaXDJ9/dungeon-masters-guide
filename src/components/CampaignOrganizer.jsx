import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import { auth, db } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, doc, getDoc, updateDoc, query, where, getDocs } from 'firebase/firestore';
import './CampaignOrganizer.css';

const CampaignOrganizer = ({ campaigns, setCampaigns }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCampaignTitle, setNewCampaignTitle] = useState('');
  const [newCampaignDescription, setNewCampaignDescription] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        fetchCampaigns(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchCampaigns = async (userId) => {
    const q = query(collection(db, "campaigns"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const userCampaigns = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setCampaigns(userCampaigns);
  };

  const addCampaign = async () => {
    if (!newCampaignTitle.trim()) {
      alert('Campaign title is required.');
      return;
    }
  
    let newCampaign = {
      title: newCampaignTitle,
      description: newCampaignDescription,
      gameName: "Dungeon Crawl Classics",
      stats: {
        numberOfMonstersSlain: 0,
        treasureCollected: "0 gold",
      },
      nextSession: "Not scheduled",
      notes: [],
    };
  
    if (currentUser) {
      // User is logged in, fetch the user's campaign count and increment it
      const userRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userRef);
      let userCampaignCount = userSnap.exists() && userSnap.data().campaignCount ? userSnap.data().campaignCount + 1 : 1;
  
      // Add the new campaign with the numeric ID
      const docRef = await addDoc(collection(db, "campaigns"), {
        ...newCampaign,
        userId: currentUser.uid,
        numericId: userCampaignCount,  // Store the numeric ID
      });
  
      // Update the user's campaign count
      await updateDoc(userRef, { campaignCount: userCampaignCount });
  
      // Update the local state with the new campaign, including the Firestore-generated ID and numeric ID
      newCampaign.id = docRef.id;
      newCampaign.numericId = userCampaignCount;
      setCampaigns([...campaigns, newCampaign]);
    } else {
      // No user logged in, use local state and sequential IDs
      newCampaign.id = campaigns.length + 1;
      newCampaign.numericId = campaigns.length + 1; // Use the same value for numericId in test mode
      setCampaigns([...campaigns, newCampaign]);
    }
  
    setNewCampaignTitle('');
    setNewCampaignDescription('');
    setIsModalOpen(false);
  };
  

  return (
    <div className="campaign-grid">
      {campaigns.map((campaign) => (
        <Link key={campaign.id} to={`/campaign/${campaign.id}`} className="campaign-box">
          <h3>{campaign.title}</h3>
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