import React, { useState } from 'react';

const NPCGenerator = () => {
  const [npcName, setNpcName] = useState('');
  const [race, setRace] = useState('');
  const [gender, setGender] = useState('');

  const names = {
    Human:{
  Male: ["James", "John", "Robert", "Michael", "William", "David", "Richard", "Charles", "Joseph", "Thomas", "Christopher", "Daniel", "Paul", "Mark", "Donald", "George", "Kenneth", "Steven", "Edward", "Brian", "Ronald", "Anthony", "Kevin", "Jason", "Matthew", "Gary", "Timothy", "Jose", "Larry", "Jeffrey", "Frank", "Scott", "Eric", "Stephen", "Andrew", "Raymond", "Gregory", "Joshua", "Jerry", "Dennis", "Walter", "Patrick", "Peter", "Harold", "Douglas", "Henry", "Carl", "Arthur", "Ryan"],
  Female: ["Mary", "Patricia", "Linda", "Barbara", "Elizabeth", "Jennifer", "Maria", "Susan", "Margaret", "Dorothy", "Lisa", "Nancy", "Karen", "Betty", "Helen", "Sandra", "Donna", "Carol", "Ruth", "Sharon", "Michelle", "Laura", "Sarah", "Kimberly", "Deborah", "Jessica", "Shirley", "Cynthia", "Angela", "Melissa", "Brenda", "Amy", "Anna", "Rebecca", "Virginia", "Kathleen", "Pamela", "Martha", "Debra", "Amanda", "Stephanie", "Carolyn", "Christine", "Marie", "Janet", "Catherine", "Frances", "Ann", "Joyce", "Diane"],
  Family: ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson", "Clark", "Rodriguez", "Lewis", "Lee", "Walker", "Hall", "Allen", "Young", "Hernandez", "King", "Wright", "Lopez", "Hill", "Scott", "Green", "Adams", "Baker", "Gonzalez", "Nelson", "Carter", "Mitchell", "Perez", "Roberts", "Turner", "Phillips", "Campbell", "Parker", "Evans", "Edwards", "Collins"],
},
    Elf: {
      Male: ["Aelar", "Aerdeth", "Alathar", "Ariandar", "Arromar", "Baelor", "Berrian", "Caranthir", "Dorathil", "Elenion", "Felaern", "Gaerlan", "Haladavar", "Iefyr", "Jassin", "Kaelthas", "Laethan", "Maiele", "Naevan", "Oleran", "Paeral", "Quarion", "Raegel", "Saevel", "Talathar", "Uldor", "Vaalyun", "Xilfir", "Yestar", "Zylphar", "Aelor", "Belegon", "Celadon", "Drannor", "Erenduil", "Faenor", "Galinndan", "Heian", "Iliphar", "Janrel", "Kyren", "Lorandar", "Meliamne", "Neldor", "Orophin", "Pharom", "Quilathe", "Rolen", "Saradoc", "Torian"],
      Female: ["Aelene", "Althaea", "Anastrianna", "Bethrynna", "Caelynn", "Drusilia", "Enna", "Faenya", "Gaelira", "Haleth", "Ielenia", "Jenala", "Kethryllia", "Leshanna", "Maelyrra", "Nuala", "Oriana", "Phaerl", "Quelenna", "Rennyn", "Sariel", "Thalia", "Uneath", "Vadania", "Xanaphia", "Yllana", "Zephyr", "Ariadne", "Briseis", "Celebrian", "Dariel", "Eilistraee", "Firael", "Giliath", "Hacathra", "Ithilwen", "Jathal", "Lireal", "Melian", "Nyssa", "Oleria", "Paelias", "Quillathe", "Rina", "Sylvara", "Tiaathque", "Undomiel", "Veladonna", "Ysera"],
      Family: ["Amakiir", "Caundur", "Eladithas", "Galadon", "Ilphelkiir", "Liadon", "Meliamne", "Nai'lo", "Siannodel", "Xiloscient", "Yaeldrin", "Aelasar", "Braegen", "Durothil", "Elaqirelle", "Firahel", "Gweyr", "Holimion", "Iathrana", "Jassin", "Kyrenaian", "Lanliss", "Mystralath", "Nuindil", "Ostoroth", "Pholontor", "Rhothomir", "Sylven", "Tiltathana", "Uldreiyn", "Vandiir", "Wysarion", "Xilriven", "Yelpeiros", "Zolerii", "Aeravansel", "Briarfell", "Cithreth", "Dewinstral", "Eathalena", "Faelyn", "Goltorah", "Hanali", "Inchel", "Jhaartael", "Koehlanna", "Lathalas", "Maendellyn", "Naïlo", "Orivan", "Pyralis", "Quisys", "Rivleam", "Sylmiir", "Tellynnan"],
        },
    Dwarf: {
      Male: ["Brom", "Thrain", "Durnar", "Grognar", "Harbek", "Kildrak", "Morgran", "Orsik", "Rurik", "Taklinn", "Dolgrin", "Gardain", "Hurn", "Kargien", "Nalral", "Dagnal", "Flint", "Barendd", "Gurdek", "Jargen", "Kurdek", "Marden", "Nurval", "Oskar", "Rangrim", "Regdar", "Tordek", "Urgram", "Vondal", "Adrik", "Alberich", "Baern", "Brottor", "Bruenor", "Dain", "Dalgal", "Eberk", "Einkil", "Fargrim", "Gimurt", "Harald", "Korlag", "Lodar", "Lunn", "Magnar", "Nordak", "Olunt", "Ragnok", "Sindri", "Tordak"],
      Female: ["Amber", "Artin", "Audhild", "Bardryn", "Dagnal", "Diesa", "Eldeth", "Falkrunn", "Finellen", "Gunnloda", "Gurdis", "Helja", "Hlin", "Kathra", "Kristryd", "Ilde", "Liftrasa", "Mardred", "Riswynn", "Sannl", "Torbera", "Torgga", "Vistra", "Beyla", "Dorthe", "Frida", "Gerdur", "Hilda", "Kara", "Linna", "Morna", "Orgha", "Ragna", "Sif", "Therlin", "Thodris", "Torunn", "Urda", "Veklani", "Welda", "Anika", "Brynja", "Erika", "Greta", "Jora", "Kirsten", "Lisbet", "Marit", "Nissa", "Runa"],
      Family: ["Ironfist", "Hammerstone", "Silverforge", "Bronzebeard", "Copperpot", "Steelforge", "Goldpeak", "Stonehammer", "Ironheart", "Steelshaper", "Bricklayer", "Coalborn", "Deepdelver", "Earthguard", "Forgefire", "Graveltoes", "Hardback", "Ironhewer", "Leadbelly", "Marblefist", "Nickelback", "Orecrusher", "Pebblefoot", "Quartzfist", "Rockseeker", "Slatehand", "Tinvein", "Underhill", "Volcanoborn", "Whetstone", "Amberrock", "Boulderbreaker", "Cragsman", "Driftminer", "Earthborn", "Flintfinder", "Gemcutter", "Horngrip", "Ironband", "Jewelcrafter", "Keeneye", "Firmroot", "Softsinger", "Loudshield", "Proudwing", "Quickblade", "Rubblestone", "Silvervein", "Tunnelmaster", "Vaultkeeper"],
        },
    Dragonborn: {
  Male: ["Arjhan", "Balasar", "Bharash", "Donaar", "Ghesh", "Heskan", "Kriv", "Medrash", "Mehen", "Nadarr", "Pandjed", "Patrin", "Rhogar", "Shamash", "Shedinn", "Tarhun", "Torinn", "Akrath", "Barlen", "Caxius", "Drazir", "Esburn", "Falkrin", "Grexij", "Hisrith", "Iojan", "Jaxan", "Korthul", "Lhurmar", "Moxal", "Narjax", "Othkent", "Paxir", "Quirash", "Rathkran", "Savax", "Thaxar", "Uxrin", "Vexrish", "Wyrmborn", "Xarthon", "Yarjerit", "Zavrel", "Azurin", "Bixan", "Draxon", "Fenxar", "Gharrix", "Jurrash", "Kalzir"],
  Female: ["Akra", "Biri", "Daar", "Farideh", "Harann", "Flavilar", "Jheri", "Kava", "Korinn", "Misrav", "Nala", "Perra", "Raiann", "Sora", "Surina", "Thava", "Uadjit", "Vezera", "Zykroff", "Welsa", "Yrthra", "Tzarei", "Ezrina", "Ovari", "Ulphia", "Fyrnna", "Vorstra", "Seraphis", "Gurada", "Hicaryn", "Qizryn", "Morqwen", "Lirael", "Zenphi", "Biriz", "Carophyl", "Doriryn", "Estroth", "Fenzira", "Ghysara", "Herrix", "Ixilya", "Jaxira", "Kythryl", "Laryx", "Moryn", "Nystrum", "Oxora", "Pyxrin", "Rysta"],
  Family: ["Clethtinthiallor", "Daardendrian", "Delmirev", "Drachedandion", "Fenkenkabradon", "Kepeshkmolik", "Kerrhylon", "Kimbatuul", "Linxakasendalor", "Myastan", "Nemmonis", "Norixius", "Ophinshtalajiir", "Prexijandilin", "Shestendeliath", "Turnuroth", "Verthisathurgiesh", "Yarjerit", "Zephyr", "Zofiasar", "Amaxath", "Brexanmor", "Crystalmir", "Dornxian", "Exarthon", "Fyrnstahl", "Grixikar", "Haxanmyr", "Ixenthior", "Jaxonyx", "Kyrnxiros", "Lythrex", "Mystanor", "Nyrxius", "Ophyxikar", "Pyrothil", "Qyxorin", "Rysthax", "Syrnaxar", "Tyranthax", "Uxaril", "Vexryn", "Wyrmaxan", "Xyranth", "Ysthomar", "Zaxarom", "Axiroth", "Byrnax", "Cyroxar", "Dyrnistor"],
    },
Gnome:{
  Male: ["Alston", "Alvyn", "Boddynock", "Brocc", "Burgell", "Dimble", "Eldon", "Erky", "Fonkin", "Frug", "Gerbo", "Gimble", "Glim", "Jebeddo", "Kellen", "Namfoodle", "Orryn", "Roondar", "Seebo", "Sindri", "Warryn", "Wrenn", "Zook", "Fibblestib", "Dabbledob", "Gnorlin", "Kuiper", "Nackle", "Miggledy", "Ping", "Quott", "Raulnor", "Sapplings", "Tendertoe", "Uvarkk", "Vigg", "Wiggan", "Xavbin", "Yebbeg", "Zaffrab", "Aleslosh", "Bilbron", "Coddleflop", "Dingbos", "Eldwin", "Fablen", "Grindle", "Habble", "Irrin", "Jepp"],
  Female: ["Bimpnottin", "Breena", "Caramip", "Carlin", "Donella", "Duvamil", "Ella", "Ellyjobell", "Ellywick", "Lilli", "Loopmottin", "Lorilla", "Mardnab", "Nissa", "Nyx", "Oda", "Orla", "Roywyn", "Shamil", "Tana", "Waywocket", "Zanna", "Ariena", "Bilba", "Cymbi", "Drusilia", "Elfi", "Filiare", "Gimblegyre", "Helna", "Illycor", "Jilli", "Knisper", "Lilla", "Miniver", "Nebin", "Olida", "Pilwicken", "Quilla", "Roxi", "Sabbi", "Tilli", "Ulla", "Veni", "Wixie", "Xanthi", "Yebbi", "Zolli", "Ambergleam"],
  Family: ["Beren", "Daergel", "Folkor", "Garrick", "Nackle", "Murnig", "Ningel", "Raulnor", "Scheppen", "Timbers", "Turen", "Aleslosh", "Ashhearth", "Badger", "Cloak", "Doublelock", "Filchbatter", "Fnipper", "Ku", "Nim", "Oneshoe", "Sparklegem", "Stumbleduck", "Fizzlebang", "Gimlen", "Hornbori", "Ironfoot", "Jabberknoll", "Knickknack", "Levershaft", "Mugginns", "Noggin", "Oakenshield", "Puddlewhistle", "Quillsharpener", "Rattlebag", "Shortwick", "Tinkertorque", "Underbough", "Voltorbolt", "Wagglewig", "Whistlesteam", "Yardwand", "Zephyrzoom", "Amberwand", "Bristleblitz", "Cobblecrank", "Dabblestomp", "Eggbumble", "Fizzlecrank"],
},
Halfling: {
  Male: ["Alton", "Ander", "Cade", "Corrin", "Eldon", "Errich", "Finnan", "Garret", "Lindal", "Lyle", "Merric", "Milo", "Osborn", "Perrin", "Reed", "Roscoe", "Wellby", "Andwise", "Bilbo", "Doder", "Fodo", "Gregor", "Hobart", "Lob", "Mungo", "Rollo", "Samwise", "Thodo", "Waldo", "Will", "Antos", "Brando", "Cale", "Dell", "Eddie", "Fildo", "Gordo", "Hal", "Isen", "Jasper", "Kodo", "Lopo", "Matto", "Nordo", "Ollie", "Podo", "Quinto", "Rando", "Sammich", "Togo"],
  Female: ["Andry", "Bree", "Callie", "Cora", "Euphemia", "Jillian", "Kithri", "Lavinia", "Lidda", "Merla", "Nedda", "Paela", "Portia", "Seraphina", "Shaena", "Trym", "Vani", "Verna", "Amaryllis", "Charmaine", "Daisy", "Daphne", "Flora", "Gilly", "Jasmine", "Lily", "Rosie", "Tansy", "Zinnia", "Alia", "Bonny", "Celia", "Donna", "Ethel", "Fern", "Greta", "Hazel", "Ivy", "Jessie", "Katy", "Leena", "Mina", "Nola", "Opal", "Penny", "Quilly", "Ruby", "Sally", "Tina"],
  Family: ["Brushgather", "Goodbarrel", "Greenbottle", "High-hill", "Hilltopple", "Leagallow", "Tealeaf", "Thorngage", "Tosscobble", "Underbough", "Bramblefoot", "Appleblossom", "Bigheart", "Brightmoon", "Brushgather", "Cherrycheeks", "Copperkettle", "Deephollow", "Elderberry", "Fastfoot", "Glenfellow", "Goldfound", "Goodroot", "Goody", "Greenleaf", "High-hill", "Hilltopple", "Hogcollar", "Ironfoot", "Leafwalker", "Marblefoot", "Nimblefingers", "Oatfarmer", "Puddle", "Quickstep", "Riverjump", "Sandwich", "Silverpin", "Smoothhands", "Teapot", "Thistletop", "Tumblebelly", "Underhill", "Whispermouse", "Willowbrook", "Yellowtoes", "Zephyrbreeze", "Berrypicker", "Cloudwatcher"],
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
