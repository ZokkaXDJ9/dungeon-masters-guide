import React, { useState } from 'react';

const NPCGenerator = () => {
  const [npcName, setNpcName] = useState('');
  const [race, setRace] = useState('');
  const [gender, setGender] = useState('');

  const names = {
    Human: {
      Male: ["Toman", "Cedric", "Ian", "Garrick", "Eron", "Lorne", "Bran", "Merek", "Horace", "Orin", "Perrin", "Alden", "Stefan", "Darian", "Fenton", "Quill", "Kellen", "Nolan", "Roric", "Jorah"],
      Female: ["Isolde", "Clarice", "Penelope", "Alia", "Eilis", "Hestia", "Gwendolyn", "Rosalind", "Bethra", "Morwenna", "Seraphina", "Deirdra", "Orla", "Fiona", "Lysa", "Tamsin", "Quin", "Janna", "Nia", "Kiera"],
      Family: ["Blackwood", "Fairchild", "Hightower", "Stormwind", "Greenwood", "Ironheart", "Lightfoot", "Duskwalker", "Moonshadow", "Ravenclaw"],
    },
    Elf: {
      Male: ["Ithilien", "Fenion", "Sariel", "Meliel", "Drystan", "Berrian", "Galinndan", "Rolen", "Aerin", "Kaelthas", "Lysander", "Haldir", "Oropher", "Erevan", "Caranthir", "Thranduil", "Jorund", "Phaendar", "Naiilo", "Quoril"],
      Female: ["Rian", "Ilphelkiir", "Thalia", "Enna", "Amara", "Kaela", "Dathiel", "Melian", "Phaedra", "Cenriel", "Lireal", "Berwyn", "Giliath", "Olerie", "Sylvarie", "Jelenneth", "Nuala", "Quelenna", "Faenya", "Haela"],
      Family: ["Nightbreeze", "Silverleaf", "Shadowalker", "Sunweaver", "Moonwhisper", "Starfinder", "Dawnrunner", "Skywatcher", "Forestwalker", "Riverblade"],
    },
    Dwarf: {
      Male: ["Drakkar", "Fargrim", "Adrik", "Morgran", "Dain", "Harbek", "Grendar", "Baern", "Kildrak", "Rurik", "Yorvar", "Thorin", "Skorri", "Veit", "Oskar", "Wulfgar", "Taklinn", "Zanar", "Eberk", "Nain"],
      Female: ["Katri", "Draka", "Hilda", "Vistra", "Eldeth", "Grenna", "Mardred", "Amara", "Norra", "Zerda", "Bruna", "Ragna", "Dagnal", "Orfea", "Sannl", "Torgga", "Ferya", "Thora", "Yurgunn", "Wilma"],
      Family: ["Ironforge", "Hammerhand", "Stonefist", "Bronzebeard", "Anvilbrow", "Forgefire", "Goldfinder", "Rockhearth", "Deepmine", "Steelshaper"],
    },
    Dragonborn: {
      Male: ["Torinn", "Bharash", "Zraedar", "Ophinshtalajiir", "Arjhan", "Sorastrasz", "Palarandusk", "Mehen", "Kerkad", "Ghesh", "Razeth", "Balasar", "Krekor", "Draxan", "Yarjerit", "Fharngnarthnost", "Pandjed", "Verthisathurgiesh", "Medrash", "Khiraj"],
      Female: ["Akra", "Fasaria", "Kava", "Heskan", "Myastan", "Daar", "Misrith", "Sirjik", "Umara", "Zofia", "Yrjixtilex", "Saphara", "Jheri", "Biri", "Thava", "Korinn", "Belaxarim", "Otiyax", "Surina", "Tamara"],
      Family: ["Fireforge", "Frostclaw", "Stormscale", "Blazefang", "Thunderscale", "Ironhide", "Goldenscale", "Platinumclaw", "Copperwing", "Silvermaw"],
    },
    Gnome: {
      Male: ["Fizzbang", "Rondo", "Boddynock", "Dimble", "Fonkin", "Gorbo", "Jib", "Kellen", "Namfoodle", "Orryn", "Roondar", "Seebo", "Sindri", "Wrenn", "Zook", "Bingle", "Gerbo", "Quillsharpener", "Tilver", "Bilbron"],
      Female: ["Bimpnottin", "Caramip", "Duvamil", "Ellyjobell", "Ellywick", "Lilli", "Loopmottin", "Mardnab", "Nissa", "Nyx", "Oda", "Orla", "Roywyn", "Shamil", "Tana", "Waywocket", "Zanna", "Karina", "Frixell", "Pireena"],
      Family: ["Gearspark", "Coppercoil", "Gizmoflare", "Steamwhistle", "Tinkerturn", "Blastcog", "Springlock", "Widgetwrench", "Cogspin", "Rivetbeard"],
    },
    Halfling: {
      Male: ["Andwise", "Brando", "Cade", "Diggory", "Eldon", "Finnigan", "Garret", "Harol", "Issac", "Lyle", "Milo", "Ned", "Osborn", "Perry", "Quint", "Roscoe", "Sanford", "Theo", "Ulmo", "Wilcome"],
      Female: ["Amara", "Bell", "Coral", "Daphne", "Eglantine", "Fenna", "Grace", "Helga", "Ivy", "Jasmine", "Kithri", "Lavinia", "Marigold", "Nellie", "Opal", "Poppy", "Quintessa", "Rosalind", "Seraphina", "Tansy"],
      Family: ["Greenbottle", "Brushgather", "Tallfellow", "Underhill", "Goodbarrel", "Leafwort", "Hilltopple", "Proudfoot", "Appledore", "Thistlewick"],
    },
  };

  const getRandomElement = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  const professions = ["Warrior", "Mage", "Blacksmith", "Merchant", "Scholar", "Bard", "Carpenter", "Farmer", "Hunter", "Doctor", "Alchemist", "Cleric", "Diplomat", "Seamstress", "Scribe", "Tailor"];


  const generateNPC = () => {
    let selectedRace = race;
    let selectedGender = gender;
  
    // If race or gender is "Random", choose them randomly
    if (!race || race === "Random") selectedRace = getRandomElement(Object.keys(names));
    if (!gender || gender === "Random") {
      const possibleGenders = Object.keys(names[selectedRace]).filter(option => option !== "Family");
      selectedGender = getRandomElement(possibleGenders);
    }
  
    const raceNames = names[selectedRace][selectedGender];
    const randomFirstName = getRandomElement(raceNames);
    const randomFamilyName = getRandomElement(names[selectedRace].Family);
    const randomProfession = getRandomElement(professions);
  
    const generatedName = `${randomFirstName} ${randomFamilyName}`;
  
    setNpcName({
      name: generatedName,
      race: selectedRace,
      gender: selectedGender,
      profession: randomProfession
    });
  };
    
  return (
    <div>
      <h2>Random NPC Generator</h2>
      <label>
        Race:
        <select value={race} onChange={(e) => setRace(e.target.value)}>
          <option value="">Random</option>
          {Object.keys(names).map((race, index) => (
            <option key={index} value={race}>{race}</option>
          ))}
        </select>
      </label>
      <br />
      <label>
  Gender:
  <select value={gender} onChange={(e) => setGender(e.target.value)}>
    <option value="">Random</option>
    {race &&
      Object.keys(names[race]).filter(genderOption => genderOption !== "Family").map((gender, index) => (
        <option key={index} value={gender}>
          {gender}
        </option>
      ))}
  </select>
</label>
      <br />
      <button onClick={generateNPC}>Generate NPC</button>
      <br />
      {npcName && (
        <div>
  <h3>Generated NPC:</h3>
  <p>
    <strong>Name:</strong> {npcName.name}<br />
    <strong>Race:</strong> {npcName.race}<br />
    <strong>Gender:</strong> {npcName.gender}<br />
    <strong>Profession:</strong> {npcName.profession}<br />

  </p>
</div>
      )}
    </div>
  );
};

export default NPCGenerator;
