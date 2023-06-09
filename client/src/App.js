import React from "react";
import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Company from "./pages/Company";
import Checkout from "./pages/Checkout";
import Cart from "./pages/Cart";
import Header from "./components/Header";

import ProductList from "./components/ProductList";
import Footer from "./components/Footer";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <div>
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <ProductList />
          <>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/me" element={<Profile />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/Company" element={<Company />} />
              <Route path="/cart" element={<Cart />}/>
              <Route path="/Checkout" element={<Checkout />}/>
              <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
          </>
          <Footer />
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;
