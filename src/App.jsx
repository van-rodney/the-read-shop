import React from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import "./App.css";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <Header />

      {/* Dynamic page content */}
      <main className="flex-grow pt-20">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="text-center text-gray-500 py-4">
        ©2025 The Read Shop
      </footer>
    </div>
  );
}