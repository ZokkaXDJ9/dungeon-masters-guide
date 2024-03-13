import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore'; // Make sure these are imported

const NPCDetails = () => {
  const { npcId } = useParams();
  const [npc, setNpc] = useState(null);

  useEffect(() => {
    const fetchNpcDetails = async () => {
      if (auth.currentUser) {
        // Fetch NPC details from Firestore
        const npcRef = doc(db, "npcs", npcId);
        const npcSnap = await getDoc(npcRef);

        if (npcSnap.exists()) {
          setNpc({ id: npcSnap.id, ...npcSnap.data() });
        } else {
          console.log("No such NPC!");
        }
      } else {
        // Fetch NPC details from session storage
        const storedNpcs = JSON.parse(sessionStorage.getItem('npcs')) || [];
        const foundNpc = storedNpcs.find(npc => npc.id === npcId);
        setNpc(foundNpc);
      }
    };

    fetchNpcDetails();
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
