import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_PRODUCTS } from '../utils/queries';
import { DELETE_PRODUCT } from '../utils/mutations';

function Admin() {
  const { loading, data } = useQuery(GET_ALL_PRODUCTS);
  const [deleteProduct] = useMutation(DELETE_PRODUCT);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='admin-container'>
      <h2>CRUD Operations</h2>
      <button className='add-product-btn'>Add Product</button>
      {data.productList.map(p => {
        return (
          <div key={p._id} className='admin-block'>
            <div>Product ID: {p._id}</div>
            <div>Title: <span className='admin-block-title'>{p.title}</span></div>
            <div>Description: {p.description}</div>
            <div>Price: {p.price}</div>
            <div>Stock: {p.quantity}</div>
            <button>Update</button>
            <button onClick={() => {
              deleteProduct({ variables: { id: p._id } });
              document.location.reload();
            }}>Delete</button>
          </div>
        )
      })}
    </div>
  )
}

export default Admin;