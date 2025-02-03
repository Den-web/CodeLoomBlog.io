import { Routes, Route } from "react-router-dom";
import Layout from "./components/layouts/MainLayout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound"; // Optional 404 page

function App() {
  return (
    <Routes>
      {/* Routes that use Layout */}
      <Route element={<Layout children={undefined} />}>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      {/* Routes without Layout */}
      <Route path="/login" element={<Login />} />
      
      {/* 404 Not Found Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
