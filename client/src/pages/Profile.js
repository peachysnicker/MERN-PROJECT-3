import React, {useState} from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { ADD_PAYMENT_INFO } from '../utils/mutations';

import Auth from '../utils/auth';

function Profile() {
  const { loadingQuery, data } = useQuery(GET_ME);
  console.log(data);
  const [addPaymentInfo, { loadingMutation, error}] = useMutation(ADD_PAYMENT_INFO);
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addPaymentInfo({
        variables: {
          payment: {
            card_number: cardNumber,
            expiration_date: expirationDate,
            cvv: cvv
          }
        }
      });

      // Clear the input fields after the mutation is completed
      setCardNumber('');
      setExpirationDate('');
      setCvv('');
    } catch (error) {
      console.error(error);
    }
  };
  
  if (loadingQuery || loadingMutation) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    console.log(error);
  }

  return (
    <div>
      {Auth.loggedIn() ? (
        <div>
          <div>ID: {data ? data.me._id : ''}</div>
          <div>Email: {data ? data.me.email : ''}</div>
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="cardNumber">Card Number:</label>
            <input type="text" id="cardNumber" value={cardNumber} onChange={(event) => setCardNumber(event.target.value)} />
            <label htmlFor="expirationDate">Expiration Date:</label>
            <input type="text" id="expirationDate" value={expirationDate} onChange={(event) => setExpirationDate(event.target.value)} />
            <label htmlFor="cvv">CVV:</label>
            <input type="text" id="cvv" value={cvv} onChange={(event) => setCvv(event.target.value)} />
            <button type="submit">Save Payment Information</button>
          </form>
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