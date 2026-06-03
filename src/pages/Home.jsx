import React from 'react';

import Navbar from '../bar/Navbar';
import Header from '../components/Header';
import Progress from '../components/Progress';
import Habit from '../components/Habit';

import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user, loading } = useAuth();

  // 🔒 prevent flicker before auth loads
  if (loading) {
    return (
      <div className="app">
        <p style={{ color: 'white' }}>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="app">
      {/* NAV */}
      <Navbar />

      {/* HEADER (now uses user info inside Header component) */}
      <Header />

      {/* PROGRESS */}
      <Progress />

      {/* HABITS */}
      <Habit />
    </div>
  );
}
