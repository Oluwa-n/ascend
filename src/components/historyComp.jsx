import React, { useEffect, useState } from 'react';
import '../styles/history.scss';

import { getHabits } from '../services/habits';

export default function HistoryComp() {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    loadHistory();

    const interval = setInterval(() => {
      loadHistory();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const loadHistory = async () => {
    try {
      const data = await getHabits();

      const sorted = [...data].sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));

      setHabits(sorted);
    } catch (error) {
      console.error(error);
    }
  };

  const getStatusText = (habit) => {
    if (habit.status === 'done') return 'Completed';
    if (habit.status === 'failed') return 'Missed';
    if (habit.active) return 'Active';
    return 'Waiting';
  };

  return (
    <section className="history-page">
      <div className="history-header">
        <h2>Performance History</h2>

        <p>Track consistency, streaks and recent habit activity.</p>
      </div>

      <div className="history-list">
        {habits.length === 0 ? (
          <div className="empty-history">
            <h3>No habits yet</h3>
            <p>Create a habit to start tracking progress.</p>
          </div>
        ) : (
          habits.map((habit) => (
            <div
              key={habit.id}
              className={`history-card ${
                habit.status === 'done' ? 'completed' : habit.status === 'failed' ? 'failed' : ''
              }`}
            >
              <div className="history-left">
                <div className="history-title-row">
                  <h3>{habit.title}</h3>

                  <span className={`status-badge ${habit.status}`}>{getStatusText(habit)}</span>
                </div>

                <div className="history-meta">
                  <span>
                    Created{' '}
                    {habit.createdAt ? new Date(habit.createdAt).toLocaleDateString() : '--'}
                  </span>

                  <span>•</span>

                  <span>Last Done {habit.lastCompletedDate || 'Never'}</span>

                  <span>•</span>

                  <span>
                    Updated{' '}
                    {habit.updatedAt ? new Date(habit.updatedAt).toLocaleDateString() : '--'}
                  </span>
                </div>
              </div>

              <div className="history-right">
                <div className="streak-pill">🔥 {habit.streak || 0}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
