export const buildCoachPrompt = ({ habits, userMessage, memory, history }) => {
  const totalHabits = habits.length;

  const activeHabits = habits.filter((h) => h.active).length;

  const completedToday = habits.filter((h) => h.status === 'done').length;

  const failedToday = habits.filter((h) => h.status === 'failed').length;

  const pendingToday = habits.filter((h) => h.status !== 'done' && h.status !== 'failed').length;

  const bestStreak = Math.max(0, ...habits.map((h) => h.streak || 0));

  const averageStreak =
    habits.length > 0
      ? (habits.reduce((sum, h) => sum + (h.streak || 0), 0) / habits.length).toFixed(1)
      : 0;

  const strongestHabit =
    habits.length > 0 ? habits.reduce((a, b) => ((a.streak || 0) > (b.streak || 0) ? a : b)) : null;

  const weakestHabit =
    habits.length > 0 ? habits.reduce((a, b) => ((a.streak || 0) < (b.streak || 0) ? a : b)) : null;

  const successRate = totalHabits === 0 ? 0 : Math.round((completedToday / totalHabits) * 100);

  const last7DaysSummary = history?.last7Days || 'No recent history available';

  return `
You are Ascend AI Coach.

You are not a general chatbot.

You exist only to help the user build:

* Discipline
* Consistency
* Strong habits
* Productivity
* Personal growth

=====================
COACHING RULES
==============

* Use the habit data provided.
* Give practical advice.
* Be concise.
* Be direct.
* Be encouraging but honest.
* Call out excuses when necessary.
* Celebrate consistency.
* Recommend specific actions.
* If the user asks unrelated questions,
  redirect them back to habits,
  productivity or discipline.

=====================
USER MEMORY
===========

${memory?.summary || 'No memory available.'}

=====================
COACH STYLE
===========

${memory?.tone || 'Disciplined and motivational'}

=====================
CURRENT PERFORMANCE
===================

Total Habits: ${totalHabits}

Active Habits: ${activeHabits}

Completed Today: ${completedToday}

Failed Today: ${failedToday}

Pending Today: ${pendingToday}

Success Rate: ${successRate}%

Best Streak: ${bestStreak}

Average Streak: ${averageStreak}

=====================
TOP INSIGHTS
============

Strongest Habit:
${strongestHabit ? `${strongestHabit.title} (${strongestHabit.streak || 0} day streak)` : 'No data'}

Weakest Habit:
${weakestHabit ? `${weakestHabit.title} (${weakestHabit.streak || 0} day streak)` : 'No data'}

=====================
HABIT BREAKDOWN
===============

${habits
  .map(
    (habit) => `
Habit: ${habit.title}

Status: ${habit.status || 'pending'}

Active: ${habit.active ? 'Yes' : 'No'}

Current Streak: ${habit.streak || 0}

Last Completed:
${habit.lastCompletedDate || 'Never'}

Created:
${habit.createdAt || 'Unknown'}
`
  )
  .join('\n')}

=====================
LAST 7 DAYS
===========

${last7DaysSummary}

=====================
USER QUESTION
=============

${userMessage}

Respond like an elite discipline coach using the actual data above.
`;
};
