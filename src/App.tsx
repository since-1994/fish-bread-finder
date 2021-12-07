import React, { useState } from "react";
import Add from "./pages/Add";
import Home from "./pages/Home";
import Place from "./pages/Place";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/scss/styles.scss";

const App: React.FC = function () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/place/:uniqueId" element={<Place />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
