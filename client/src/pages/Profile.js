import React, {useState} from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { ADD_PAYMENT_INFO, ADD_ADDRESS } from '../utils/mutations';

import Auth from '../utils/auth';

function Profile() {
  const { loadingQuery, data } = useQuery(GET_ME);
  const [addPaymentInfo, { loadingMutation, error}] = useMutation(ADD_PAYMENT_INFO);
  const [addAddress, { loading: loadingAddress, error: addressError}] = useMutation(ADD_ADDRESS);
  

  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');

  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');

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

  const handleAddressFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await addAddress({
        variables: {
          address: {
            street: street,
            city: city,
            province: province,
            postal_code: postalCode,
            phone: phone,
          },
        },
      });
      // Clear the input fields after the mutation is completed
      setStreet('');
      setCity('');
      setProvince('');
      setPostalCode('');
      setPhone('');
    } catch (e) {
      console.log(e);
    }
  };
  
  if (loadingQuery || loadingMutation || loadingAddress) {
    return <div>Loading...</div>;
  }
  
  if (error || addressError) {
    return <div>{error || addressError}</div>
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

          <form onSubmit={handleAddressFormSubmit}>
            <label htmlFor="street">Street:</label>
            <input type="text" id="street" value={street} onChange={(event) => setStreet(event.target.value)} />
            <label htmlFor="city">City:</label>
            <input type="text" id="city" value={city} onChange={(event) => setCity(event.target.value)} />
            <label htmlFor="province">Province:</label>
            <input type="text" id="province" value={province} onChange={(event) => setProvince(event.target.value)} />
            <label htmlFor="postalCode">Postal Code:</label>
            <input type="text" id="postalCode" value={postalCode} onChange={(event) => setPostalCode(event.target.value)} />
            <label htmlFor="phone">Phone:</label>
            <input type="text" id="phone" value={phone} onChange={(event) => setPhone(event.target.value)} />
            <button type="submit">Save Address Information</button>
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