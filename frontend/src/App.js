import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Navigation from './components/Navigation/Navigation';
import TeacherDashboard from './components/Teacher/Dashboard';
import StudentDashboard from './components/Student/Dashboard';
import GenerateQuestionPaper from './components/Teacher/generate';
import History from './components/Teacher/history';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navigation />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected routes for teachers */}
            <Route 
              path="/teacher/dashboard" 
              element={
                <ProtectedRoute requiredRole="TEACHER">
                  <TeacherDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/teacher/generate" 
              element={
                <ProtectedRoute requiredRole="TEACHER">
                  <GenerateQuestionPaper />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/teacher/history" 
              element={
                <ProtectedRoute requiredRole="TEACHER">
                  <History />
                </ProtectedRoute>
              } 
            />
            
            {/* Protected routes for students */}
            <Route 
              path="/student/dashboard" 
              element={
                <ProtectedRoute requiredRole="STUDENT">
                  <StudentDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Catch all route - redirect to appropriate dashboard */}
            <Route 
              path="*" 
              element={
                <ProtectedRoute>
                  <Navigate to="/login" replace />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
