import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { auth, db } from '../firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [showLoginButton, setShowLoginButton] = useState(false); // State to control the login button display
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setShowLoginButton(false); // Reset the login button visibility

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: username });

      // Save the additional user info in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        username: username,
        email: email,
        // Add any other user info here
      });

      // Redirect the user after successful signup
      navigate('/');
    } catch (error) {
      setError(error.message);
      if (error.code === 'auth/email-already-in-use') {
        setError('Email already in use. Please login.');
        setShowLoginButton(true); // Show the login button
      }
    }
  };

  const navigateToLogin = () => {
    navigate('/login'); // Navigate to the login page
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit">Sign Up</button>
      {error && <p>{error}</p>}
      {showLoginButton && <button onClick={navigateToLogin}>Go to Login</button>}
    </form>
  );
};

export default SignupForm;
