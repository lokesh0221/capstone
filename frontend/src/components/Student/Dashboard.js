import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import '../Dashboard.css';

const StudentDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.username}!</h1>
        <p>Ready to explore and learn new concepts?</p>
      </div>
      
      <div className="dashboard-content">
        <div className="dashboard-card">
          <h3>Learning Hub</h3>
          <p>Ask questions and get detailed explanations from your textbooks.</p>
          {/* Student dashboard functionality will be implemented in later tasks */}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;