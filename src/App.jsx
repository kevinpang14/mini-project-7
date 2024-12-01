import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Blog from "./pages/Blog";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import BlogDetail from "./pages/BlogDetail";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Blog />} />
          <Route path="/detail/:slug" element={<BlogDetail />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
