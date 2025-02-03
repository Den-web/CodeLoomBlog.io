import React from "react";
import { useAuth } from "../hooks/useAuth";

const Home: React.FC = () => {
  const { user, isAuthenticated, login, logout } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Home Page</h1>

      <div>Home</div>
      
      {isAuthenticated ? (
        <div className="bg-white shadow-lg p-6 rounded-lg text-center">
          <p className="text-lg">Hello, <span className="font-semibold">{user?.name || "User"}</span>!</p>
          <button 
            onClick={logout} 
            className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="bg-white shadow-lg p-6 rounded-lg text-center">
          <p className="text-lg">You are not logged in.</p>
          <button 
            onClick={() => login("fake-token", { name: "John Doe" })} 
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;