import React, { useState } from 'react';

const NPCGenerator = () => {
    const [npc, setNpc] = useState({});

    const races = ["Human", "Elf", "Dwarf", "Halfling", "Orc"];
    const occupations = ["Warrior", "Mage", "Ranger", "Priest", "Thief"];
    const traits = ["Brave", "Cowardly", "Rude", "Kind", "Greedy"];

    const generateNPC = () => {
        const newNpc = {
            name: `NPC-${Math.floor(Math.random() * 1000)}`, // Simple random name generator
            race: races[Math.floor(Math.random() * races.length)],
            occupation: occupations[Math.floor(Math.random() * occupations.length)],
            trait: traits[Math.floor(Math.random() * traits.length)],
        };

        setNpc(newNpc);
    };

    return (
        <div>
            <h2>NPC Generator</h2>
            <button onClick={generateNPC}>Generate NPC</button>
            <div>
                <p>Name: {npc.name}</p>
                <p>Race: {npc.race}</p>
                <p>Occupation: {npc.occupation}</p>
                <p>Trait: {npc.trait}</p>
            </div>
        </div>
    );
};

export default NPCGenerator;
