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
      <CustomToolbar />
      <ReactQuill theme="snow" value={note} onChange={setNote} modules={{
          toolbar: {
            container: "#toolbar",
          }
        }}
/>
      <button onClick={saveNote}>Save Note</button>
    </div>
  );
};


const CustomToolbar = () => (
  <div id="toolbar">
    <select className="ql-header" defaultValue={""} onChange={e => e.persist()}>
      <option value="1">Heading</option>
      <option value="2">Subheading</option>
      <option selected>Normal</option>
    </select>
    <button className="ql-bold"></button>
    <button className="ql-italic"></button>
    <button className="ql-underline"></button>
    <button className="ql-strike"></button>
    <select className="ql-color">
      <option value="red">Red</option>
      <option value="green">Green</option>
      <option value="blue">Blue</option>
      <option value="orange">Orange</option>
      <option value="violet">Violet</option>
      <option value="#d0d1d2">Grey</option>
    </select>
    <button className="ql-list" value="ordered"></button>
    <button className="ql-list" value="bullet"></button>
    <button className="ql-link"></button>
    <button className="ql-image"></button>
    <button className="ql-video"></button>
  </div>
);



export default NoteEditor;
