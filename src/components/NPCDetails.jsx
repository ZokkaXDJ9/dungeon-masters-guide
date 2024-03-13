import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const NPCDetails = () => {
  const { npcId } = useParams();
  const [npc, setNpc] = useState(null);

  useEffect(() => {
    // Assuming NPCs are stored in session storage
    const storedNpcs = JSON.parse(sessionStorage.getItem('npcs')) || [];
    const foundNpc = storedNpcs.find(npc => npc.id === npcId);
    setNpc(foundNpc);
  }, [npcId]);

  if (!npc) {
    return <div>NPC not found</div>;
  }

  return (
    <div>
      <h2>{npc.name}</h2>
      <p><strong>Race:</strong> {npc.race}</p>
      <p><strong>Gender:</strong> {npc.gender}</p>
      <p><strong>Profession:</strong> {npc.profession}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default NPCDetails;
