import React, { useEffect, useState } from 'react';
import '../styles/habit.scss';

import { getHabits, addHabit, updateHabit, setHabitCompletion } from '../services/habits';

import AddHabitModal from './AddHabitModal';

const getToday = () => new Date().toISOString().split('T')[0];

export default function Habit() {
  const [habits, setHabits] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    loadHabits();
  }, []);

  const loadHabits = async () => {
    try {
      const data = await getHabits();

      const today = getToday();

      const updated = await Promise.all(
        data.map(async (habit) => {
          if (habit.lastResetDate !== today) {
            let updates = {
              active: false,
              completed: false,
              status: 'pending',
              lastResetDate: today,
            };

            // Activated but never answered
            if (habit.active && habit.status === 'pending') {
              updates.streak = 0;
            }

            // Marked failed yesterday
            if (habit.active && habit.status === 'failed') {
              updates.streak = 0;
            }

            await updateHabit(habit.id, updates);

            return {
              ...habit,
              ...updates,
            };
          }

          return {
            ...habit,
            status: habit.status || 'pending',
          };
        })
      );

      setHabits(updated);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveHabit = async (title) => {
    try {
      await addHabit(title);

      await loadHabits();

      setShowAddModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleActivate = async (habitId, active) => {
    const newActive = !active;

    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === habitId
          ? {
              ...habit,
              active: newActive,
              completed: false,
              status: 'pending',
            }
          : habit
      )
    );

    try {
      await updateHabit(habitId, {
        active: newActive,
        completed: false,
        status: 'pending',
      });
    } catch (error) {
      console.error(error);
      loadHabits();
    }
  };

  const handleStatus = async (habitId, status) => {
    const habit = habits.find((h) => h.id === habitId);

    if (!habit?.active) {
      return;
    }

    setHabits((prev) =>
      prev.map((h) =>
        h.id === habitId
          ? {
              ...h,
              status,
              completed: status === 'done',
            }
          : h
      )
    );

    try {
      await setHabitCompletion(habitId, status === 'done');
    } catch (error) {
      console.error(error);
      loadHabits();
    }
  };

  const activeHabits = habits.filter((h) => h.active);

  const completedHabits = activeHabits.filter((h) => h.status === 'done').length;

  return (
    <>
      {' '}
      <section className="habits-section">
        {' '}
        <div className="habits-header">
          {' '}
          <div>
            {' '}
            <h2>Today's Habits</h2>
            <span>
              {completedHabits} of {activeHabits.length} completed
            </span>
          </div>
          <button className="add-habit-btn" onClick={() => setShowAddModal(true)}>
            + Add Habit
          </button>
        </div>
        <div className="habits-list">
          {habits.map((habit) => (
            <div
              key={habit.id}
              className={`habit-card
  ${habit.active ? 'active' : ''}
  ${habit.status === 'done' ? 'completed' : ''}
  ${habit.status === 'failed' ? 'failed' : ''}
`}
            >
              <div className="habit-left">
                <div
                  className={`status-dot ${
                    habit.status === 'done' ? 'done' : habit.status === 'failed' ? 'failed' : ''
                  }`}
                />

                <div className="habit-info">
                  <h3>{habit.title}</h3>

                  <span>🔥 {habit.streak || 0} day streak</span>
                </div>
              </div>

              <div className="habit-actions">
                {/* ACTIVATE */}

                <button
                  className={`icon-btn activate ${habit.active ? 'active' : ''}`}
                  onClick={() => handleActivate(habit.id, habit.active)}
                >
                  {habit.active ? '🟢' : '⭕'}
                </button>

                {/* DONE */}

                <button
                  disabled={!habit.active}
                  className={`icon-btn done ${habit.status === 'done' ? 'active' : ''}`}
                  onClick={() => handleStatus(habit.id, 'done')}
                >
                  ✓
                </button>

                {/* FAILED */}

                <button
                  disabled={!habit.active}
                  className={`icon-btn failed ${habit.status === 'failed' ? 'active' : ''}`}
                  onClick={() => handleStatus(habit.id, 'failed')}
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <AddHabitModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleSaveHabit}
      />
    </>
  );
}
