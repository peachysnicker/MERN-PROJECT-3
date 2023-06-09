import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { ADD_PAYMENT_INFO, ADD_ADDRESS } from "../utils/mutations";
import { Link } from "react-router-dom";

import Auth from "../utils/auth";

function Profile() {
  const { loadingQuery, data } = useQuery(GET_ME);
  const [addPaymentInfo, { loadingMutation, error }] =
    useMutation(ADD_PAYMENT_INFO);
  const [addAddress, { loading: loadingAddress, error: addressError }] =
    useMutation(ADD_ADDRESS);
  console.log(data);

  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");

  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addPaymentInfo({
        variables: {
          payment: {
            card_number: cardNumber,
            expiration_date: expirationDate,
            cvv: cvv,
          },
        },
      });

      // Clear the input fields after the mutation is completed
      setCardNumber("");
      setExpirationDate("");
      setCvv("");
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
      setStreet("");
      setCity("");
      setProvince("");
      setPostalCode("");
      setPhone("");
    } catch (e) {
      console.log(e);
    }
  };

  if (loadingQuery || loadingMutation || loadingAddress) {
    return <div>Loading...</div>;
  }

  if (error || addressError) {
    return <div>{error || addressError}</div>;
  }

  return (
    <div className="profile-container">
      {Auth.loggedIn() ? (
        <div className="profile">
          <h6>Your Account Information:</h6>
          <div>ID: {data ? data.me._id : ""}</div>
          <div>Email: {data ? data.me.email : ""}</div>
          <div>
            Admin:{" "}
            {data ? (
              data.me.isAdmin ? (
                <Link to="/admin">Go to Admin Page</Link>
              ) : (
                "N/A"
              )
            ) : (
              ""
            )}
          </div>
          <div>
            Credit card info:{" "}
            {data ? (data.me.payment.cvv !== null ? "Saved" : "") : ""}
          </div>
          <div>
            Address:{" "}
            {data
              ? data.me.address.city !== null
                ? `${data.me.address.street} ${data.me.address.city} ${data.me.address.province}`
                : ""
              : ""}
          </div>
          <form className="" onSubmit={handleFormSubmit}>
            <h2>Save your card info</h2>
            <label htmlFor="cardNumber">Card Number:</label>
            <input
              type="text"
              id="cardNumber"
              value={cardNumber}
              onChange={(event) => setCardNumber(event.target.value)}
            />{" "}
            <br />
            <label htmlFor="expirationDate">Expiration Date:</label>
            <input
              type="text"
              id="expirationDate"
              value={expirationDate}
              onChange={(event) => setExpirationDate(event.target.value)}
            />{" "}
            <br />
            <label htmlFor="cvv">CVV:</label>
            <input
              type="text"
              id="cvv"
              value={cvv}
              onChange={(event) => setCvv(event.target.value)}
            />{" "}
            <br />
            <button className="btn btn-block btn-light" type="submit">
              Save Payment Information
            </button>
          </form>
          <form className="" onSubmit={handleAddressFormSubmit}>
            <h2>Save your address info</h2>
            <label htmlFor="street">Street:</label>
            <input
              type="text"
              id="street"
              value={street}
              onChange={(event) => setStreet(event.target.value)}
            />{" "}
            <br />
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(event) => setCity(event.target.value)}
            />{" "}
            <br />
            <label htmlFor="province">Province:</label>
            <input
              type="text"
              id="province"
              value={province}
              onChange={(event) => setProvince(event.target.value)}
            />{" "}
            <br />
            <label htmlFor="postalCode">Postal Code:</label>
            <input
              type="text"
              id="postalCode"
              value={postalCode}
              onChange={(event) => setPostalCode(event.target.value)}
            />{" "}
            <br />
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />{" "}
            <br />
            <button className="btn btn-block btn-light" type="submit">
              Save Address Information
            </button>
          </form>
        </div>
      ) : (
        <div>
          <h6>Please log in to view your profile</h6>
          <br></br>
          <Link to="/login">login</Link>
        </div>
      )}
    </div>
  );
}

export default Profile;
