import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from '../pages/Profile';
import Publications from '../pages/Publications';
import Projects from '../pages/Projects';
import Teaching from '../pages/Teaching';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ConferenceTalks from '../pages/ConferenceTalks';
import MediaCoverage from '../pages/MediaCoverage';
import PhotoGallery from '../pages/PhotoGallery';
import ContactNetworking from '../pages/ContactNetworking';
import AnalyticsDashboard from '../pages/AnalyticsDashboard';
import PDF from"../pages/PDF"

const AppRoutes = () => {
  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/teaching" element={<Teaching />} />
          <Route path="/conferencetalks" element={<ConferenceTalks />} />
          <Route path="/photogallery" element={<PhotoGallery />} />
          <Route path="/contactnetworking" element={<ContactNetworking />} />
          <Route path="/analyticsdashboard" element={<AnalyticsDashboard />} />
          <Route path="/pdf" element={<PDF />} />
          <Route path="*" element={<h1>404: Page Not Found</h1>} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default AppRoutes;
