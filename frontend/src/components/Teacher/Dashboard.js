import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import '../Dashboard.css';

const TeacherDashboard = () => {
  const { user } = useAuth();
  
  // Sample timetable data - in a real app, this would come from an API based on user.id
  const [timetable] = useState({
    Monday: [
      { time: '9:00 AM - 10:00 AM', subject: 'Mathematics', class: 'Grade 10A', room: 'Room 101', teacherId: user?.id },
      { time: '10:30 AM - 11:30 AM', subject: 'Physics', class: 'Grade 11B', room: 'Lab 2', teacherId: user?.id },
      { time: '2:00 PM - 3:00 PM', subject: 'Mathematics', class: 'Grade 9C', room: 'Room 105', teacherId: user?.id }
    ],
    Tuesday: [
      { time: '8:00 AM - 9:00 AM', subject: 'Physics', class: 'Grade 12A', room: 'Lab 1', teacherId: user?.id },
      { time: '11:00 AM - 12:00 PM', subject: 'Mathematics', class: 'Grade 10B', room: 'Room 102', teacherId: user?.id },
      { time: '1:00 PM - 2:00 PM', subject: 'Study Hall', class: 'Grade 11A', room: 'Library', teacherId: user?.id }
    ],
    Wednesday: [
      { time: '9:30 AM - 10:30 AM', subject: 'Mathematics', class: 'Grade 10A', room: 'Room 101', teacherId: user?.id },
      { time: '11:00 AM - 12:00 PM', subject: 'Physics', class: 'Grade 11B', room: 'Lab 2', teacherId: user?.id },
      { time: '3:00 PM - 4:00 PM', subject: 'Extra Classes', class: 'Grade 12', room: 'Room 103', teacherId: user?.id }
    ],
    Thursday: [
      { time: '8:30 AM - 9:30 AM', subject: 'Physics', class: 'Grade 12A', room: 'Lab 1', teacherId: user?.id },
      { time: '10:00 AM - 11:00 AM', subject: 'Mathematics', class: 'Grade 9C', room: 'Room 105', teacherId: user?.id },
      { time: '2:30 PM - 3:30 PM', subject: 'Mathematics', class: 'Grade 10B', room: 'Room 102', teacherId: user?.id }
    ],
    Friday: [
      { time: '9:00 AM - 10:00 AM', subject: 'Mathematics', class: 'Grade 10A', room: 'Room 101', teacherId: user?.id },
      { time: '10:30 AM - 11:30 AM', subject: 'Physics', class: 'Grade 11B', room: 'Lab 2', teacherId: user?.id },
      { time: '1:00 PM - 2:00 PM', subject: 'Faculty Meeting', class: 'All Staff', room: 'Conference Room', teacherId: user?.id }
    ],
    Saturday: [
      { time: '9:00 AM - 10:00 AM', subject: 'Remedial Classes', class: 'Grade 10', room: 'Room 104', teacherId: user?.id },
      { time: '10:30 AM - 11:30 AM', subject: 'Parent Meeting', class: 'Grade 11', room: 'Room 101', teacherId: user?.id }
    ],
    Sunday: []
  });

  const getCurrentDay = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[new Date().getDay()];
  };

  const currentDay = getCurrentDay();

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">

        {/* Today's Schedule Card */}
        <div className="dashboard-card">
          <h3>Today's Classes ({currentDay}) - {user?.username}</h3>
          {timetable[currentDay].length > 0 ? (
            <div className="today-schedule">
              {timetable[currentDay]
                .filter(class_ => class_.teacherId === user?.id)
                .map((class_, index) => (
                <div key={index} className="class-item today-class">
                  <div className="class-time">{class_.time}</div>
                  <div className="class-details">
                    <strong>{class_.subject}</strong>
                    <div className="class-info">{class_.class} • {class_.room}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-classes">No classes scheduled for today!</p>
          )}
        </div>

        {/* Weekly Timetable Card */}
        <div className="dashboard-card timetable-card">
          <h3>Weekly Timetable - {user?.username}</h3>
          <div className="timetable-grid">
            {Object.entries(timetable).map(([day, classes]) => (
              <div key={day} className={`day-column ${day === currentDay ? 'current-day' : ''}`}>
                <div className="day-header">
                  <h4>{day}</h4>
                  {day === currentDay && <span className="current-indicator">Today</span>}
                </div>
                <div className="day-classes">
                  {classes.filter(class_ => class_.teacherId === user?.id).length > 0 ? (
                    classes
                      .filter(class_ => class_.teacherId === user?.id)
                      .map((class_, index) => (
                      <div key={index} className="class-item">
                        <div className="class-time">{class_.time}</div>
                        <div className="class-subject">{class_.subject}</div>
                        <div className="class-info">
                          <small>{class_.class}</small>
                          <small>{class_.room}</small>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="no-classes-day">No classes</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard-content {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          margin-top: 20px;
        }

        .timetable-card {
          grid-column: 1 / -1;
        }

        .timetable-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 15px;
          margin-top: 15px;
        }

        .day-column {
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          overflow: hidden;
          background: #ffffff;
          transition: all 0.3s ease;
        }

        .day-column.current-day {
          border-color: #4CAF50;
          box-shadow: 0 2px 8px rgba(76, 175, 80, 0.2);
        }

        .day-header {
          background: #f5f5f5;
          padding: 12px;
          text-align: center;
          position: relative;
        }

        .current-day .day-header {
          background: #4CAF50;
          color: white;
        }

        .day-header h4 {
          margin: 0;
          font-size: 14px;
          font-weight: 600;
        }

        .current-indicator {
          position: absolute;
          top: 2px;
          right: 8px;
          background: rgba(255, 255, 255, 0.3);
          padding: 2px 6px;
          border-radius: 10px;
          font-size: 10px;
          font-weight: bold;
        }

        .day-classes {
          padding: 8px;
          min-height: 200px;
        }

        .class-item {
          background: #f9f9f9;
          border-radius: 6px;
          padding: 8px;
          margin-bottom: 8px;
          border-left: 3px solid #ddd;
          transition: all 0.2s ease;
        }

        .class-item:hover {
          background: #f0f8ff;
          border-left-color: #2196F3;
        }

        .today-class {
          border-left-color: #4CAF50;
          background: #f8fff8;
        }

        .class-time {
          font-size: 11px;
          color: #666;
          font-weight: 500;
          margin-bottom: 4px;
        }

        .class-subject {
          font-weight: 600;
          color: #333;
          font-size: 13px;
          margin-bottom: 2px;
        }

        .class-details {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .class-info {
          font-size: 11px;
          color: #666;
        }

        .class-info small {
          display: block;
          line-height: 1.3;
        }

        .no-classes-day {
          text-align: center;
          color: #999;
          font-style: italic;
          padding: 20px 0;
          font-size: 12px;
        }

        .today-schedule {
          margin-top: 10px;
        }

        .today-schedule .class-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          margin-bottom: 10px;
        }

        .today-schedule .class-time {
          min-width: 120px;
          font-size: 12px;
          font-weight: 600;
          color: #4CAF50;
          margin-bottom: 0;
        }

        .no-classes {
          text-align: center;
          color: #999;
          font-style: italic;
          padding: 20px 0;
        }

        @media (max-width: 768px) {
          .timetable-grid {
            grid-template-columns: 1fr;
            gap: 10px;
          }
          
          .day-column {
            margin-bottom: 10px;
          }
          
          .today-schedule .class-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
          }
          
          .today-schedule .class-time {
            min-width: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default TeacherDashboard;