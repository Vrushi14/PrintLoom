import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Landing } from './pages/Landing';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Prints } from './pages/Prints';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { UserDashboard } from './pages/UserDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { useAuthStore } from './store/authStore';

function App() {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/prints" element={<Prints />} />
            <Route path="/contact" element={<Contact />} />
            <Route 
              path="/login" 
              element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} 
            />
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? (
                  user?.role === 'admin' ? (
                    <AdminDashboard />
                  ) : (
                    <UserDashboard />
                  )
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </main>
        <Footer />
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;