import React, { useEffect, useState } from 'react';
import '../styles/progress.scss';

import { getHabits } from '../services/habits';

export default function Progress() {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    loadProgress();

    const interval = setInterval(() => {
      loadProgress();
    }, 3000);

    window.addEventListener('focus', loadProgress);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', loadProgress);
    };
  }, []);

  const loadProgress = async () => {
    try {
      const data = await getHabits();
      setHabits(data);
    } catch (error) {
      console.error(error);
    }
  };

  const activeHabits = habits.filter((habit) => habit.active);

  const doneHabits = activeHabits.filter((habit) => habit.status === 'done');

  const totalHabits = activeHabits.length;

  const percentage = totalHabits === 0 ? 0 : Math.round((doneHabits.length / totalHabits) * 100);

  const bestStreak = Math.max(0, ...habits.map((habit) => habit.streak || 0));

  const circumference = 327;

  const strokeDashoffset = circumference - (circumference * percentage) / 100;

  const getMessage = () => {
    if (percentage === 100) {
      return 'Outstanding. Every habit completed today.';
    }

    if (percentage >= 80) {
      return 'You are building serious consistency.';
    }

    if (percentage >= 50) {
      return 'Solid progress. Keep stacking wins.';
    }

    if (percentage > 0) {
      return 'Momentum starts with small actions.';
    }

    return 'Activate a habit and begin your day.';
  };

  return (
    <section className="progress-card">
      {' '}
      <div className="progress-top">
        {' '}
        <div className="progress-info">
          {' '}
          <span className="progress-label">Today's Progress </span>
          <h2>{percentage}%</h2>
          <p>
            {doneHabits.length} of {totalHabits} habits completed
          </p>
        </div>
        <div className="progress-circle">
          <svg viewBox="0 0 120 120">
            <circle className="bg" cx="60" cy="60" r="52" />

            <circle
              className="progress"
              cx="60"
              cy="60"
              r="52"
              style={{
                strokeDashoffset,
              }}
            />
          </svg>

          <span>{percentage}%</span>
        </div>
      </div>
      {/* NEW HORIZONTAL PROGRESS BAR */}
      <div className="progress-line-wrapper">
        <div className="progress-line">
          <div
            className="progress-line-fill"
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>

        <span className="progress-line-text">{percentage}% Completed</span>
      </div>
      {/* HIGHLIGHTS */}
      <div className="progress-highlights">
        <div className="highlight-item">
          <span>🔥 Best Streak</span>
          <strong>{bestStreak} Days</strong>
        </div>

        <div className="highlight-item">
          <span>🎯 Active Today</span>
          <strong>{totalHabits}</strong>
        </div>

        <div className="highlight-item">
          <span>✅ Completed</span>
          <strong>{doneHabits.length}</strong>
        </div>
      </div>
      <div className="progress-bottom">
        <div className="status-pill">{getMessage()}</div>
      </div>
    </section>
  );
}
