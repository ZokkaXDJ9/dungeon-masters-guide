import React, { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import CampaignOrganizer from './components/CampaignOrganizer';
import CampaignDetails from './components/CampaignDetails';
import MainSite from './components/MainSite';
import EncounterBuilder from './components/EncounterBuilder';
import NPCGenerator from './components/NPCGenerator';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import UserProfile from './components/UserProfile';
import VerifyEmail from './components/VerifyEmail';
import NPCDetails from './components/NPCDetails';
import NoteEditor from './components/NoteEditor';

const App = () => {
  const [campaigns, setCampaigns] = useState([]);

  return (
    <HashRouter>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path='/' element={<MainSite />}/>
          <Route path="/campaign-organizer" element={<CampaignOrganizer campaigns={campaigns} setCampaigns={setCampaigns} />} />
          <Route path="/campaign/:id" element={<CampaignDetails campaigns={campaigns} />} />
          <Route path="/encounter-builder" element={<EncounterBuilder />} />
          <Route path="/npc-generator" element={<NPCGenerator />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/npcs/:npcId" element={<NPCDetails />} />
          <Route path="/note-editor/:campaignId" element={<NoteEditor campaigns={campaigns} setCampaigns={setCampaigns} />} />

        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;
