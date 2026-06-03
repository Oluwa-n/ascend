import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  arrayUnion,
} from 'firebase/firestore';

import { db, auth } from '../firebase/config';

const getToday = () => new Date().toISOString().split('T')[0];

const getYesterday = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

const getHabitsCollection = () => {
  const uid = auth.currentUser?.uid;

  if (!uid) {
    throw new Error('User not authenticated');
  }

  return collection(db, 'users', uid, 'habits');
};

export const getHabits = async () => {
  const snapshot = await getDocs(getHabitsCollection());

  return snapshot.docs.map((docItem) => ({
    id: docItem.id,
    ...docItem.data(),
  }));
};

export const getHabit = async (id) => {
  const uid = auth.currentUser?.uid;

  if (!uid) {
    throw new Error('User not authenticated');
  }

  const habitRef = doc(db, 'users', uid, 'habits', id);

  const snapshot = await getDoc(habitRef);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
};

export const addHabit = async (title) => {
  const uid = auth.currentUser?.uid;

  if (!uid) {
    throw new Error('User not authenticated');
  }

  return await addDoc(collection(db, 'users', uid, 'habits'), {
    title,
    active: false,
    completed: false,
    status: 'pending',
    streak: 0,
    lastCompletedDate: null,
    lastResetDate: getToday(),
    history: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });
};

export const updateHabit = async (id, updates) => {
  const uid = auth.currentUser?.uid;

  if (!uid) {
    throw new Error('User not authenticated');
  }

  const habitRef = doc(db, 'users', uid, 'habits', id);

  await updateDoc(habitRef, {
    ...updates,
    updatedAt: Date.now(),
  });
};

export const deleteHabit = async (id) => {
  const uid = auth.currentUser?.uid;

  if (!uid) {
    throw new Error('User not authenticated');
  }

  await deleteDoc(doc(db, 'users', uid, 'habits', id));
};

export const setHabitActive = async (id, active = true) => {
  const uid = auth.currentUser?.uid;

  if (!uid) {
    throw new Error('User not authenticated');
  }

  const habitRef = doc(db, 'users', uid, 'habits', id);

  await updateDoc(habitRef, {
    active,
    completed: false,
    status: 'pending',
    updatedAt: Date.now(),
  });
};

export const resetHabitsIfNeeded = async () => {
  const uid = auth.currentUser?.uid;

  if (!uid) {
    throw new Error('User not authenticated');
  }

  const habits = await getHabits();

  const today = getToday();

  for (const habit of habits) {
    if (habit.lastResetDate !== today) {
      let streak = habit.streak || 0;

      if (habit.active && habit.status === 'pending') {
        streak = 0;

        await updateDoc(doc(db, 'users', uid, 'habits', habit.id), {
          history: arrayUnion({
            date: habit.lastResetDate || today,
            status: 'failed',
          }),
        });
      }

      if (habit.active && habit.status === 'failed') {
        streak = 0;
      }

      await updateDoc(doc(db, 'users', uid, 'habits', habit.id), {
        active: false,
        completed: false,
        status: 'pending',
        streak,
        lastResetDate: today,
        updatedAt: Date.now(),
      });
    }
  }
};

export const setHabitCompletion = async (id, completed) => {
  const uid = auth.currentUser?.uid;

  if (!uid) {
    throw new Error('User not authenticated');
  }

  const habitRef = doc(db, 'users', uid, 'habits', id);

  const snapshot = await getDoc(habitRef);

  if (!snapshot.exists()) {
    return;
  }

  const habit = snapshot.data();

  if (!habit.active) {
    return;
  }

  const today = getToday();
  const yesterday = getYesterday();

  let streak = habit.streak || 0;

  if (completed === true) {
    if (habit.lastCompletedDate === today) {
      await updateDoc(habitRef, {
        completed: true,
        status: 'done',
        updatedAt: Date.now(),
      });

      return;
    }

    if (habit.lastCompletedDate === yesterday) {
      streak += 1;
    } else {
      streak = 1;
    }

    await updateDoc(habitRef, {
      completed: true,
      status: 'done',
      streak,
      lastCompletedDate: today,
      history: arrayUnion({
        date: today,
        status: 'done',
      }),
      updatedAt: Date.now(),
    });

    return;
  }

  await updateDoc(habitRef, {
    completed: false,
    status: 'failed',
    history: arrayUnion({
      date: today,
      status: 'failed',
    }),
    updatedAt: Date.now(),
  });
};

export const markHabitDone = async (id) => {
  return setHabitCompletion(id, true);
};

export const markHabitFailed = async (id) => {
  return setHabitCompletion(id, false);
};

export const getCompletedHabitsCount = async () => {
  const habits = await getHabits();

  return habits.filter((habit) => habit.status === 'done').length;
};

export const getActiveHabitsCount = async () => {
  const habits = await getHabits();

  return habits.filter((habit) => habit.active).length;
};

export const getBestStreak = async () => {
  const habits = await getHabits();

  if (!habits.length) {
    return 0;
  }

  return Math.max(...habits.map((habit) => habit.streak || 0));
};

export const getHabitHistory = async (id) => {
  const habit = await getHabit(id);

  return habit?.history || [];
};

export const getTotalCompletedDays = async (id) => {
  const habit = await getHabit(id);

  if (!habit?.history) {
    return 0;
  }

  return habit.history.filter((item) => item.status === 'done').length;
};

export const getTotalFailedDays = async (id) => {
  const habit = await getHabit(id);

  if (!habit?.history) {
    return 0;
  }

  return habit.history.filter((item) => item.status === 'failed').length;
};

export const getOverallStats = async () => {
  const habits = await getHabits();

  const totalHabits = habits.length;

  const totalCompleted = habits.reduce(
    (count, habit) => count + (habit.history?.filter((item) => item.status === 'done').length || 0),
    0
  );

  const totalFailed = habits.reduce(
    (count, habit) =>
      count + (habit.history?.filter((item) => item.status === 'failed').length || 0),
    0
  );

  const bestStreak = habits.length ? Math.max(...habits.map((habit) => habit.streak || 0)) : 0;

  return {
    totalHabits,
    totalCompleted,
    totalFailed,
    bestStreak,
  };
};
