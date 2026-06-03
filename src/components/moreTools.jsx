import React, { useEffect, useState } from 'react';
import '../styles/more.scss';

import { getHabits, updateHabit, deleteHabit, addHabit } from '../services/habits';

import { useAuth } from '../context/AuthContext';

export default function Moretool() {
  const { logout } = useAuth();
  const { user } = useAuth();

  const [habits, setHabits] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [newHabit, setNewHabit] = useState('');

  useEffect(() => {
    loadHabits();
  }, []);

  const loadHabits = async () => {
    try {
      const data = await getHabits();
      setHabits(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (id) => {
    if (!editValue.trim()) return;

    try {
      await updateHabit(id, {
        title: editValue.trim(),
      });

      setEditingId(null);
      setEditValue('');

      loadHabits();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteHabit(id);
      loadHabits();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = async () => {
    if (!newHabit.trim()) return;

    try {
      await addHabit(newHabit.trim());

      setNewHabit('');

      loadHabits();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }
  };

  const bestStreak = habits.length ? Math.max(...habits.map((h) => h.streak || 0)) : 0;

  const totalCompleted = habits.reduce(
    (total, habit) => total + (habit.history?.filter((item) => item.status === 'done').length || 0),
    0
  );

  return (
    <section className="more-page">
      <div className="more-header">
        <h2>Settings & Management</h2>
        <p>Manage your account and habits.</p>
      </div>

      <div className="profile-card">
        <div className="profile-left">
          <img src={user?.photoURL || 'https://ui-avatars.com/api/?name=User'} alt="Profile" />

          <div>
            <h3>{user?.displayName || 'Habit Tracker User'}</h3>

            <span>{user?.email}</span>
          </div>
        </div>

        <div className="profile-right">
          <span>
            Joined{' '}
            {user?.metadata?.creationTime
              ? new Date(user.metadata.creationTime).toLocaleDateString()
              : 'Recently'}
          </span>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>{habits.length}</h3>
          <span>Total Habits</span>
        </div>

        <div className="stat-card">
          <h3>{bestStreak}</h3>
          <span>Best Streak</span>
        </div>

        <div className="stat-card">
          <h3>{totalCompleted}</h3>
          <span>Completed Days</span>
        </div>
      </div>

      <div className="add-box">
        <input
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          placeholder="Create a new habit..."
        />

        <button onClick={handleAdd}>Add Habit</button>
      </div>

      <div className="habit-list">
        {habits.map((habit) => (
          <div key={habit.id} className="habit-row">
            {editingId === habit.id ? (
              <>
                <input value={editValue} onChange={(e) => setEditValue(e.target.value)} />

                <div className="actions">
                  <button onClick={() => handleEdit(habit.id)}>Save</button>

                  <button
                    onClick={() => {
                      setEditingId(null);
                      setEditValue('');
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="habit-info">
                  <h4>{habit.title}</h4>

                  <span>🔥 {habit.streak || 0} day streak</span>
                </div>

                <div className="actions">
                  <button
                    onClick={() => {
                      setEditingId(habit.id);
                      setEditValue(habit.title);
                    }}
                  >
                    Edit
                  </button>

                  <button onClick={() => handleDelete(habit.id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <button className="logout-btn" onClick={handleLogout}>
        Sign Out
      </button>
    </section>
  );
}
