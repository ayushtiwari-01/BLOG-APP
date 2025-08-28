import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Blogs from "./pages/Blogs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserBlogs from "./pages/UserBlogs";
import CreateBlog from "./pages/CreateBlog";
import BlogDetails from "./pages/BlogDetails";
import About from "./pages/about";
import { Toaster } from "react-hot-toast";

function App() {
  const location = useLocation();
  
  // Define routes where header should be hidden
  const noHeaderRoutes = ['/login', '/register'];
  
  // Check if current route should show header
  const shouldShowHeader = !noHeaderRoutes.includes(location.pathname);

  return (
    <>
      {/* Conditionally render header */}
      {shouldShowHeader && <Header />}
      <Toaster />
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/my-blogs" element={<UserBlogs />} />
        <Route path="/blog-details/:id" element={<BlogDetails />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
