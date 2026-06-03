import React, { useState, useEffect } from 'react';
import '../styles/addHabitModal.scss';

export default function AddHabitModal({ isOpen, onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setTitle('');
      setLoading(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) return;

    try {
      setLoading(true);

      await onSave(trimmedTitle);

      setTitle('');
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="habit-modal">
        <div className="modal-header">
          <h2>Add Habit</h2>
          <p>Create a new habit to track daily.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Workout, Reading, Meditation..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose} disabled={loading}>
              Cancel
            </button>

            <button type="submit" className="save-btn" disabled={loading || !title.trim()}>
              {loading ? 'Saving...' : 'Save Habit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
