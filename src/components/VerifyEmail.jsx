import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { auth } from '../firebaseConfig'; // Import auth instance from your config
import { applyActionCode } from 'firebase/auth'; // Import applyActionCode directly from firebase/auth

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
          // Handle successful email verification here
          navigate('/'); // Navigate to home or another relevant page
        })
        .catch((error) => {
          // Handle error
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
