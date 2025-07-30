import { useState } from "react";
import "./App.css";
import NotesApp from "./components/NotesApp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="/dashboard" element={<NotesApp />} />
      </Routes>
      {/* <NotesApp /> */}
    </BrowserRouter>
  );
}

export default App;
