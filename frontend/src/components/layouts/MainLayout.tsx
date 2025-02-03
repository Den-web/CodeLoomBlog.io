import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <main className="flex-grow container mx-auto p-6">
        <Outlet /> {/* 👈 This renders the current route (Home, Dashboard, etc.) */}
      </main>
      <footer className="text-center p-4 bg-gray-200">© 2025 MyApp</footer>
    </div>
  );
};

export default Layout;