import React from 'react';
import '../styles/header.scss';

import { useAuth } from '../context/AuthContext';

const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) return 'Good Morning';
  if (hour >= 12 && hour < 18) return 'Good Afternoon';

  return 'Good Evening';
};

export default function Header() {
  const { user } = useAuth();

  const name = user?.displayName || 'Champion';

  return (
    <div className="hero-section">
      {' '}
      <div className="hero-overlay" />
      <img
        className="hero-image"
        src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1600&auto=format&fit=crop"
        alt="Hero Background"
      />
      <div className="hero-content">
        <span className="hero-time">
          {getGreeting()}, {name}
        </span>

        <h1>
          Build Discipline.
          <span> Every Day.</span>
        </h1>

        <p>
          Track habits, maintain consistency, and create lasting routines through focused daily
          action.
        </p>

        <div className="hero-date">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          })}
        </div>
      </div>
    </div>
  );
}
