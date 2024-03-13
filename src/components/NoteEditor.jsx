import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { auth, db } from '../firebaseConfig';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import 'react-quill/dist/quill.snow.css';

const NoteEditor = ({ campaigns, setCampaigns }) => {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState('');

  useEffect(() => {
    // Load the campaign's note if it exists
    const campaign = campaigns.find(c => c.id === campaignId);
    if (campaign && campaign.notes) {
      setNote(campaign.notes);
    }
  }, [campaignId, campaigns]);

  const saveNote = async () => {
    const user = auth.currentUser;
    if (user) {
      // User is signed in, save the note to Firestore
      const docRef = doc(db, "campaigns", campaignId);
      await updateDoc(docRef, { notes: note });
    } else {
      // No user is signed in, update the note in session storage
      const updatedCampaigns = campaigns.map(camp => {
        if (camp.id === campaignId) {
          return { ...camp, notes: note };
        }
        return camp;
      });

      setCampaigns(updatedCampaigns);
      sessionStorage.setItem('campaigns', JSON.stringify(updatedCampaigns));
    }
    navigate(`/campaign/${campaignId}`); // Navigate back to the campaign details
  };

  return (
    <div>
      <h1>Edit Notes</h1>
      <ReactQuill theme="snow" value={note} onChange={setNote} />
      <button onClick={saveNote}>Save Note</button>
    </div>
  );
};

export default NoteEditor;
