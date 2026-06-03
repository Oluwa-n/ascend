import React, { useEffect, useState } from 'react';
import '../styles/stats.scss';

import { getHabits } from '../services/habits';

export default function StatsProgress() {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getHabits();
      setHabits(data);
    } catch (error) {
      console.error(error);
    }
  };

  const totalHabits = habits.length;

  const activeHabits = habits.filter((h) => h.active).length;

  const completedHabits = habits.filter((h) => h.status === 'done').length;

  const failedHabits = habits.filter((h) => h.status === 'failed').length;

  const pendingHabits = habits.filter((h) => h.status === 'pending').length;

  const bestStreak = Math.max(...habits.map((h) => h.streak || 0), 0);

  const averageStreak =
    totalHabits > 0
      ? (habits.reduce((sum, habit) => sum + (habit.streak || 0), 0) / totalHabits).toFixed(1)
      : 0;

  const strongestHabit =
    habits.length > 0 ? habits.reduce((a, b) => ((a.streak || 0) > (b.streak || 0) ? a : b)) : null;

  const weakestHabit =
    habits.length > 0 ? habits.reduce((a, b) => ((a.streak || 0) < (b.streak || 0) ? a : b)) : null;

  const successRate = totalHabits === 0 ? 0 : Math.round((completedHabits / totalHabits) * 100);

  return (
    <section className="stats-page">
      <div className="stats-header">
        <span className="eyebrow">Analytics</span>
        <h2>Habit Performance</h2>
        <p>Understand consistency, streaks and habit strength over time.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>{totalHabits}</h3>
          <span>Total Habits</span>
        </div>

        <div className="stat-card">
          <h3>{activeHabits}</h3>
          <span>Active Today</span>
        </div>

        <div className="stat-card">
          <h3>{bestStreak}</h3>
          <span>Best Streak</span>
        </div>

        <div className="stat-card">
          <h3>{averageStreak}</h3>
          <span>Average Streak</span>
        </div>
      </div>

      <div className="performance-card">
        <div className="performance-top">
          <h3>Success Rate</h3>
          <span>{successRate}%</span>
        </div>

        <div className="performance-bar">
          <div
            className="performance-fill"
            style={{
              width: `${successRate}%`,
            }}
          />
        </div>
      </div>

      <div className="distribution-card">
        <h3>Status Distribution</h3>

        <div className="distribution-row">
          <span>Completed</span>
          <strong>{completedHabits}</strong>
        </div>

        <div className="distribution-row">
          <span>Pending</span>
          <strong>{pendingHabits}</strong>
        </div>

        <div className="distribution-row">
          <span>Failed</span>
          <strong>{failedHabits}</strong>
        </div>
      </div>

      <div className="insights-grid">
        <div className="insight-card">
          <span>Strongest Habit</span>

          <h4>{strongestHabit?.title || 'No data yet'}</h4>

          <p>{strongestHabit?.streak || 0} day streak</p>
        </div>

        <div className="insight-card">
          <span>Needs Attention</span>

          <h4>{weakestHabit?.title || 'No data yet'}</h4>

          <p>{weakestHabit?.streak || 0} day streak</p>
        </div>
      </div>
    </section>
  );
}
