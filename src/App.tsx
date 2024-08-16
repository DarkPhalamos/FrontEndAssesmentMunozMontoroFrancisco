import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Posts from "./pages/Posts/Posts";
import EditPost from "./pages/EditPost/EditPost";
import DeletePost from "./pages/DeletePost/DeletePost";
import PrivateRoute from "./components/PrivateRoute";
import AddPost from "./pages/AddPost/AddPost";
import { ThemeProvider } from "./ThemeContext";
import ViewPost from "./pages/ViewPost/ViewPost";
import UserStatsChart from "pages/ChartsPage/UserStatsChart";
import './styles/theme.css';

const AppContent = () => {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="/posts/:id" element={<ViewPost />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/charts" element={<UserStatsChart />} />

          {/* Rutas protegidas */}
          <Route element={<PrivateRoute />}>
            <Route path="posts/create" element={<AddPost />} />
            <Route path="posts/:id/edit" element={<EditPost />} />
            <Route path="/posts/:id/delete" element={<DeletePost />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};



const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;