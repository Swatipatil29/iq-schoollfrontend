import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './SchoolTimings.css'; // Import your custom CSS file for additional styling

function SchoolTimings() {
  // Define school timing data
  const [timingsData, setTimingsData] = useState([]);

  useEffect(() => {
    // Fetch or generate your timing data here
    const fetchedTimingsData = [
      { time: '8:00 AM', activity: 'School Opens' },
      { time: '8:15 AM', activity: 'Prayer' },
      { time: '8:30 AM', activity: 'First Period' },
      { time: '9:15 AM', activity: 'Second Period' },
      { time: '10:00 AM', activity: 'Quiz and Exams' },
      { time: '10:45 AM', activity: 'Normal Break' },
      { time: '11:00 AM', activity: 'Third Period' },
      { time: '11:45 AM', activity: 'Fourth Period' },
      { time: '12:30-1:45 PM', activity: 'Lunch Break' },
      { time: '1:45 PM', activity: 'Fifth Period' },
      { time: '2:30 PM', activity: 'Sixth Period' },
      { time: '3:15 PM', activity: 'Yoga Period' },
      { time: '4:00 PM', activity: 'Extra-curricular Activities' },
      { time: '4:30 PM', activity: 'School Closes' },
    ];

    setTimingsData(fetchedTimingsData);
  }, []); // Empty dependency array means this effect will only run once

  return (
    <div className="school-timings">
      <h2 style={{ color: 'red' }}>School Timings</h2>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Time</th>
            <th>Activity</th>
          </tr>
        </thead>
        <tbody>
          {timingsData.map((item, index) => (
            <tr key={index}>
              <td>{item.time}</td>
              <td>{item.activity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SchoolTimings;
