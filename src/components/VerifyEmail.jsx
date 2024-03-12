import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { auth, db } from '../firebaseConfig';
import { applyActionCode, onAuthStateChanged } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';

const VerifyEmail = () => {
  const [searchParams, setSearchParams] = useSearchParams();
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
                navigate('/'); // or wherever you want to redirect after verification
              }).catch((error) => {
                setError(error.message);
              });
            } else {
              // No user signed in, can't update Firestore. Prompt for login or handle accordingly.
              navigate('/login', { state: { message: 'Please log in to verify your email.' } });
            }
          });
        })
        .catch((error) => {
          setError('Failed to verify email. ' + error.message);
        });
    }
  }, [navigate, searchParams]);

  return (
    <div>
      <h1>Verify Your Email</h1>
      <p>{error ? error : 'Please wait, verifying your email...'}</p>
    </div>
  );
};

export default VerifyEmail;
