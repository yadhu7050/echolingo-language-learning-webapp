import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Import components
import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Lessons from './pages/Lessons';
import LessonDetail from './pages/LessonDetail';
import Profile from './pages/Profile';
import Translator from './components/translation/Translator';
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <ChakraProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes */}
            <Route 
              path="/lessons" 
              element={
                <ProtectedRoute>
                  <Lessons />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/lessons/:id" 
              element={
                <ProtectedRoute>
                  <LessonDetail />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/translate" 
              element={
                <ProtectedRoute>
                  <Translator />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </AuthProvider>
  );
}

export default App;