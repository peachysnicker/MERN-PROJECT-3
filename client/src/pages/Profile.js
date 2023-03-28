import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';

import Auth from '../utils/auth';

function Profile() {
  const { loading, data } = useQuery(GET_ME);
  if (loading) {
    return <div>Loading...</div>
  }
  
  console.log(data);

  return (
    <div>
      {Auth.loggedIn() ? (
        <div>
          <div>ID: {data.me._id}</div>
          <div>Email: {data.me.email}</div>
        </div>
      ) : (
        <div>
          You need to login to check your profile
        </div>
      )}
    </div>
  )
}

export default Profile;