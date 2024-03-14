import React, { useState } from 'react';

function MonsterCreator() {
  const [monster, setMonster] = useState({
    name: 'Ogre',
    description: 'Large giant, chaotic evil',
    armorClass: '11 (hide armor)',
    hitPoints: '59 (7d10+21)',
    speed: '40 ft.',
    strength: '19 (+4)',
    dexterity: '8 (-1)',
    constitution: '16 (+3)',
    intelligence: '5 (-3)',
    wisdom: '7 (-2)',
    charisma: '7 (-2)',
    senses: 'darkvision 60ft., passive Perception 8',
    languages: 'Common, Giant',
    challenge: '2 (450 XP)',
    actions: [
      {
        name: 'Greatclub',
        description: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target.',
        hit: 'Hit: 13 (2d8+4) bludgeoning damage.',
      },
      {
        name: 'Javelin',
        description: 'Melee or Ranged Weapon Attack: +6 to hit, reach 5 ft. or range 30/120 ft., one target.',
        hit: 'Hit: 11 (2d6+4) piercing damage.',
      },
    ],
  });

  const handleChange = (e, field, index) => {
    if (field.startsWith('action')) {
      const actions = [...monster.actions];
      const [_, key] = field.split('.');
      actions[index][key] = e.target.value;
      setMonster(prev => ({ ...prev, actions }));
    } else {
      setMonster({ ...monster, [field]: e.target.value });
    }
  };

  const addAction = () => {
    const newAction = {
      name: '',
      description: '',
      hit: '',
    };
    setMonster(prev => ({
      ...prev,
      actions: [...prev.actions, newAction],
    }));
  };

  const removeAction = index => {
    setMonster(prev => ({
      ...prev,
      actions: prev.actions.filter((_, i) => i !== index),
    }));
  };



  return (
<div style={{
  width: '620px',
  fontFamily: 'Arial, Helvetica, sans-serif',
  fontSize: '22px',
  margin: '0 auto', // Center horizontally within its parent
  padding: '20px',
  boxSizing: 'border-box',
  background: '#f4f4f4',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
}}>      <input
        type="text"
        value={monster.name}
        onChange={(e) => handleChange(e, 'name')}
        style={{ fontSize: '225%', fontWeight: 'bold', color: '#A73335', width: '100%', textAlign: 'center' }}
      />
      <input
        type="text"
        value={monster.description}
        onChange={(e) => handleChange(e, 'description')}
        style={{ fontStyle: 'italic', width: '100%', textAlign: 'center' }}
      />

      <div style={{ background: 'linear-gradient(10deg, #A73335, white)', height: '10px', margin: '14px 0' }}></div>

      <div style={{ color: '#A73335' }}>
        <div>
          <span style={{ fontWeight: 'bold', color: '#A73335' }}>Armor Class</span>
          <input
            type="text"
            value={monster.armorClass}
            onChange={(e) => handleChange(e, 'armorClass')}
            style={{ width: '300px', marginLeft: '10px' }}
          />
        </div>
        <div>
          <span style={{ fontWeight: 'bold', color: '#A73335' }}>Hit Points</span>
          <input
            type="text"
            value={monster.hitPoints}
            onChange={(e) => handleChange(e, 'hitPoints')}
            style={{ width: '300px', marginLeft: '10px' }}
          />
        </div>
        <div>
          <span style={{ fontWeight: 'bold', color: '#A73335' }}>Speed</span>
          <input
            type="text"
            value={monster.speed}
            onChange={(e) => handleChange(e, 'speed')}
            style={{ width: '300px', marginLeft: '10px' }}
          />
        </div>
      </div>

      <div style={{ background: 'linear-gradient(10deg, #A73335, white)', height: '10px', margin: '14px 0' }}></div>

      <table style={{ width: '100%', border: '0px', borderCollapse: 'collapse', color: '#A73335', textAlign: 'center' }}>
  <tbody>
    <tr>
      <th>STR</th><th>DEX</th><th>CON</th><th>INT</th><th>WIS</th><th>CHA</th>
    </tr>
    <tr>
      <td>
        <input
          type="text"
          value={monster.strength}
          onChange={(e) => handleChange(e, 'strength')}
          style={{ width: '50px', margin: 'auto', display: 'block' }}
        />
      </td>
      <td>
        <input
          type="text"
          value={monster.dexterity}
          onChange={(e) => handleChange(e, 'dexterity')}
          style={{ width: '50px', margin: 'auto', display: 'block' }}
        />
      </td>
      <td>
        <input
          type="text"
          value={monster.constitution}
          onChange={(e) => handleChange(e, 'constitution')}
          style={{ width: '50px', margin: 'auto', display: 'block' }}
        />
      </td>
      <td>
        <input
          type="text"
          value={monster.intelligence}
          onChange={(e) => handleChange(e, 'intelligence')}
          style={{ width: '50px', margin: 'auto', display: 'block' }}
        />
      </td>
      <td>
        <input
          type="text"
          value={monster.wisdom}
          onChange={(e) => handleChange(e, 'wisdom')}
          style={{ width: '50px', margin: 'auto', display: 'block' }}
        />
      </td>
      <td>
        <input
          type="text"
          value={monster.charisma}
          onChange={(e) => handleChange(e, 'charisma')}
          style={{ width: '50px', margin: 'auto', display: 'block' }}
        />
      </td>
    </tr>
  </tbody>
</table>

      <div style={{ background: 'linear-gradient(10deg, #A73335, white)', height: '10px', margin: '14px 0' }}></div>

      {/* Continue with similar structure for other sections like Senses, Languages, etc. */}

      <div style={{ fontSize: '175%', fontVariant: 'small-caps', margin: '34px 0 0 0', color: '#A73335' }}>Actions</div>

      <div style={{ background: '#A73335', height: '4px' }}></div>

   {/* Action Section */}
   {monster.actions.map((action, index) => (
        <div key={index} style={{ margin: '10px 0' }}>
          <input
            type="text"
            placeholder="Action Name"
            value={action.name}
            onChange={(e) => handleChange(e, `action.name.${index}`)}
            style={{ fontWeight: 'bold', fontStyle: 'italic' }}
          />
          <input
            type="text"
            placeholder="Action Description"
            value={action.description}
            onChange={(e) => handleChange(e, `action.description.${index}`)}
            style={{ width: '100%' }}
          />
          <input
            type="text"
            placeholder="Action Hit"
            value={action.hit}
            onChange={(e) => handleChange(e, `action.hit.${index}`)}
            style={{ width: '100%' }}
          />
          <button onClick={() => removeAction(index)} style={{ /* Button Styling */ }}>Remove</button>
        </div>
      ))}
      <button onClick={addAction} style={{ /* Button Styling */ }}>Add Action</button>
    </div>
  );
}

export default MonsterCreator;