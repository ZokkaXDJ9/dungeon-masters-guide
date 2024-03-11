import React from 'react';
import NavBar from './components/NavBar';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Dungeon Master Helper</h1>
      </header>
      <NavBar />
      <main>
        <section>
          <h2>Welcome, Dungeon Master!</h2>
          <p>This is your ultimate tool to manage and enhance your D&D sessions. Choose a feature from the menu to get started.</p>
        </section>
      </main>
    </div>
  );
};

export default App;