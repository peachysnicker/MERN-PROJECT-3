import React, { useState } from 'react';

function Admin() {
  const [showForm1, setShowForm1] = useState(false);
  const handleShowForm1 = () => {
    setShowForm1(!showForm1);
  };

  const [showForm2, setShowForm2] = useState(false);
  const handleShowForm2 = () => {
    setShowForm2(!showForm2);
  };

  const [showForm3, setShowForm3] = useState(false);
  const handleShowForm3 = () => {
    setShowForm3(!showForm3);
  };

  const [showForm4, setShowForm4] = useState(false);
  const handleShowForm4 = () => {
    setShowForm4(!showForm4);
  };

  const [showForm5, setShowForm5] = useState(false);
  const handleShowForm5 = () => {
    setShowForm5(!showForm5);
  };

  return (
    <div className='admin-container'>
      <div className='admin-block'>
        <button onClick={handleShowForm1}>Show all products</button>
        {  
          showForm1 && 
          <div>
            form
          </div>
        }
      </div>
      <div className='admin-block'>
        <button onClick={handleShowForm2}>Check one product</button>
        {
          showForm2 && 
          <div>
            form
          </div>
        }
      </div>
      <div className='admin-block'>
      <button onClick={handleShowForm3}>Add product</button>
        {
          showForm3 && 
          <div>
            form
          </div>
        }
      </div>
      <div className='admin-block'>
        <button onClick={handleShowForm4}>Update Product</button>
        {
          showForm4 && 
          <div>
            form
          </div>
        }
      </div>
      <div className='admin-block'>
        <button onClick={handleShowForm5}>Delete Product</button>
        {
          showForm5 && 
          <div>
            form
          </div>
        }
      </div>
    </div>
  )
}

export default Admin;