import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebaseConfig';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile, signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [showLoginButton, setShowLoginButton] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setShowLoginButton(false);

    if (!username) {
      setError('Please enter a username.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: username });

      await sendEmailVerification(userCredential.user);

      await setDoc(doc(db, 'users', userCredential.user.uid), {
        username: username,
        email: email,
      });

      await signOut(auth);
      navigate('/verify-email');
    } catch (error) {
      setError(error.message);
      if (error.code === 'auth/email-already-in-use') {
        setError('Email already in use. Please login.');
        setShowLoginButton(true);
      }
    }
  };

  const navigateToLogin = () => {
    navigate('/login');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required // Ensures the form cannot be submitted without filling this field
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Sign Up</button>
      {error && <p>{error}</p>}
      {showLoginButton && <button onClick={navigateToLogin}>Go to Login</button>}
    </form>
  );
};

export default SignupForm;
