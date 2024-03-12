import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { auth, db } from '../firebaseConfig'; // Ensure db is imported from your firebaseConfig
import { applyActionCode, onAuthStateChanged } from 'firebase/auth'; // Import onAuthStateChanged
import { doc, updateDoc } from 'firebase/firestore'; // Import updateDoc and doc

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    const mode = searchParams.get('mode');
    const actionCode = searchParams.get('oobCode');

    if (mode === 'verifyEmail' && actionCode) {
      applyActionCode(auth, actionCode)
        .then(() => {
          onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, update the Firestore directly
              const userRef = doc(db, 'users', user.uid);
              updateDoc(userRef, {
                isVerified: true,
              }).then(() => {
                navigate('/'); // Navigate to home or another relevant page
              }).catch((error) => {
                // Handle Firestore update error
                setError(error.message);
              });
            } else {
              // If the user isn't signed in, handle accordingly
              setError('Verification successful, please log in.');
            }
          });
        })
        .catch((error) => {
          // Handle error from applyActionCode
          setError(error.message);
        });
    }
  }, [navigate, searchParams]);

  return (
    <div>
      <h1>Verify Your Email</h1>
      <p>{error || 'Verifying your email...'}</p>
    </div>
  );
};

export default VerifyEmail;
