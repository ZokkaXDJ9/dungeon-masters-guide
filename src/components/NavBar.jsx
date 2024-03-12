import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import './NavBar.css';

const NavBar = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <nav>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/campaign-organizer">Campaign Organizer</Link></li>
        <li><Link to="/encounter-builder">Encounter Builder</Link></li>
        <li><Link to="/npc-generator">NPC Generator</Link></li>
        {currentUser ? (
          <li className="auth-link user-menu">
            Welcome, {currentUser.displayName || 'User'}!
            <ul className="submenu">
              <li><Link to="/user-profile">Profile</Link></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
          </li>
        ) : (
          <li className="auth-link"><Link to="/signup">Signup/Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
