import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_PRODUCTS } from "../utils/queries";
import {
  DELETE_PRODUCT,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
} from "../utils/mutations";

function Admin() {
  const [showForm, setShowForm] = useState("hidden");
  const [showUpdateForm, setUpdateForm] = useState("hidden");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    price: 0,
    quantity: 0,
    category: "",
  });
  const [addProduct] = useMutation(ADD_PRODUCT);

  const [idToUpdate, setIdToUpdate] = useState("");
  const [updateFormData, setUpdateFormData] = useState({
    title: "",
    description: "",
    image: "",
    price: 0,
    quantity: 0,
    category: "",
  });
  const [updateProduct] = useMutation(UPDATE_PRODUCT);
  const handleUpdateChange = (event) => {
    setUpdateFormData({
      ...updateFormData,
      [event.target.name]: event.target.value,
    });
  };
  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(idToUpdate, updateFormData);
      await updateProduct({
        variables: {
          id: idToUpdate,
          product: {
            title: updateFormData.title,
            description: updateFormData.description,
            image: updateFormData.image,
            price: parseFloat(updateFormData.price),
            quantity: parseFloat(updateFormData.quantity),
            category: updateFormData.quantity,
          },
        },
      });
    } catch (e) {
      console.log(e);
    }

    setUpdateFormData({
      title: "",
      description: "",
      image: "",
      price: 0,
      quantity: 0,
      category: "",
    });
  };

  const { loading, data } = useQuery(GET_ALL_PRODUCTS);
  const [deleteProduct] = useMutation(DELETE_PRODUCT);
  if (loading) {
    return <div>Loading...</div>;
  }

  const handleShowForm = () => {
    if (showForm === "hidden") {
      setShowForm("default");
    } else {
      setShowForm("hidden");
    }
  };

  const handleShowUpdateForm = () => {
    if (showUpdateForm === "hidden") {
      setUpdateForm("default");
    } else {
      setUpdateForm("hidden");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    console.log(formData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await addProduct({
        variables: {
          product: {
            title: formData.title,
            description: formData.description,
            image: formData.image,
            price: parseFloat(formData.price),
            quantity: parseFloat(formData.quantity),
            category: formData.category,
          },
        },
      });
    } catch (e) {
      console.log(e);
    }

    setFormData({
      title: "",
      description: "",
      image: "",
      price: 0,
      quantity: 0,
      category: "",
    });

    document.location.reload();
  };

  return (
    <div className="admin-container">
      <h2>Admin Page</h2>
      <h5>Delete or Update Products</h5>
      <button className="add-product-btn" onClick={handleShowForm}>
        Add Product
      </button>
      <form className={showForm} onSubmit={handleSubmit}>
        <label>Title: </label> <br />
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />{" "}
        <br />
        <label>Description: </label> <br />
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />{" "}
        <br />
        <label>Image: </label> <br />
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleInputChange}
        />{" "}
        <br />
        <label>Price: </label> <br />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
        />{" "}
        <br />
        <label>Quantity: </label> <br />
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleInputChange}
        />{" "}
        <br />
        <label>Category: </label> <br />
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
        />{" "}
        <br />
        <button type="submit">Submit</button>
      </form>

      <form className={showUpdateForm} onSubmit={handleUpdateSubmit}>
        <p>Product ID: {idToUpdate}</p>
        <label>Title: </label> <br />
        <input
          type="text"
          name="title"
          value={updateFormData.title}
          onChange={handleUpdateChange}
        />{" "}
        <br />
        <label>Description: </label> <br />
        <input
          type="text"
          name="description"
          value={updateFormData.description}
          onChange={handleUpdateChange}
        />{" "}
        <br />
        <label>Image: </label> <br />
        <input
          type="text"
          name="image"
          value={updateFormData.image}
          onChange={handleUpdateChange}
        />{" "}
        <br />
        <label>Price: </label> <br />
        <input
          type="number"
          name="price"
          value={updateFormData.price}
          onChange={handleUpdateChange}
        />{" "}
        <br />
        <label>Quantity: </label> <br />
        <input
          type="number"
          name="quantity"
          value={updateFormData.quantity}
          onChange={handleUpdateChange}
        />{" "}
        <br />
        <label>Category: </label> <br />
        <input
          type="text"
          name="category"
          value={updateFormData.category}
          onChange={handleUpdateChange}
        />{" "}
        <br />
        <button className="" type="submit">
          Update Product
        </button>
      </form>

      {data.productList.map((p) => {
        return (
          <div key={p._id} className="admin-block">
            <div>
              <span className="admin-block-title">Product ID:</span> {p._id}
            </div>
            <div>
              <span className="admin-block-title">Title:</span>{" "}
              <span className="admin-block-title">{p.title}</span>
            </div>
            <div>
              <span className="admin-block-title">Description:</span>{" "}
              {p.description}
            </div>
            <div>
              <span className="admin-block-title">Image:</span> {p.image}
            </div>
            <div>
              <span className="admin-block-title">Price:</span> {p.price}
            </div>
            <div>
              <span className="admin-block-title">Quantity:</span> {p.quantity}
            </div>
            <button
              onClick={() => {
                handleShowUpdateForm();
                setIdToUpdate(p._id);
                setUpdateFormData({
                  title: p.title,
                  description: p.description,
                  image: p.image,
                  price: p.price,
                  quantity: p.quantity,
                  category: p.category,
                });
              }}
            >
              Update
            </button>
            <button
              onClick={() => {
                deleteProduct({ variables: { id: p._id } });
                document.location.reload();
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Admin;
