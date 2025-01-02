import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from '../pages/Profile';
import Publications from '../pages/Publications';
import Projects from '../pages/Projects';
import Teaching from '../pages/Teaching';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import ConferenceTalks from '../pages/ConferenceTalks';
import MediaCoverage from '../pages/MediaCoverage';
import PhotoGallery from '../pages/PhotoGallery';
import ContactNetworking from '../pages/ContactNetworking';
import AnalyticsDashboard from '../pages/AnalyticsDashboard';
import PDF from "../pages/PDF";
import ProtectedRoute from '../components/ProtectedRoute'; // Import the HOC

const AppRoutes = () => {
  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/publications"
            element={
              <ProtectedRoute>
                <Publications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <Projects />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teaching"
            element={
              <ProtectedRoute>
                <Teaching />
              </ProtectedRoute>
            }
          />
          <Route
            path="/conferencetalks"
            element={
              <ProtectedRoute>
                <ConferenceTalks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/photogallery"
            element={
              <ProtectedRoute>
                <PhotoGallery />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contactnetworking"
            element={
              <ProtectedRoute>
                <ContactNetworking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analyticsdashboard"
            element={
              <ProtectedRoute>
                <AnalyticsDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pdf"
            element={
              <ProtectedRoute>
                <PDF />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<h1>404: Page Not Found</h1>} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default AppRoutes;
