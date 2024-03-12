import React, { useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';
import { db } from '../firebaseConfig';
import { doc, getDoc } from "firebase/firestore";  // Ensure getDoc is imported here

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState({ username: '', email: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      const user = auth.currentUser;
      if (user) {
        const userProfileRef = doc(db, "users", user.uid);
        
        try {
          const userProfileSnap = await getDoc(userProfileRef);
  
          if (userProfileSnap.exists()) {
            setUserProfile(userProfileSnap.data());
          } else {
            console.log('No user profile found!');
          }
        } catch (error) {
          setError(error.message);
        }
      }
    };

    fetchUserProfile();
  }, []);

  if (error) {
    return <div>Error fetching user profile: {error}</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p><strong>Username:</strong> {userProfile.username}</p>
      <p><strong>Email:</strong> {userProfile.email}</p>
    </div>
  );
};

export default UserProfile;
