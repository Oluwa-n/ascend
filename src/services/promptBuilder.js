export const buildCoachPrompt = ({ habits, userMessage, memory, history }) => {
  const completed = habits.filter((h) => h.completed).length;
  const total = habits.length;

  const bestStreak = Math.max(...habits.map((h) => h.streak || 0));

  const avgStreak = habits.reduce((acc, h) => acc + (h.streak || 0), 0) / (habits.length || 1);

  const last7DaysSummary = history?.last7Days || 'No history available';

  return `
You are a strict habit coach AI.

RULES:
- Focus ONLY on habits, discipline, productivity
- Be short, direct, practical
- No unrelated topics
- Give actionable advice only

USER MEMORY:
${memory?.summary || 'No previous memory'}

COACH STYLE:
${memory?.tone || 'motivational'}

CURRENT STATS:
- Completed today: ${completed}/${total}
- Best streak: ${bestStreak}
- Average streak: ${avgStreak.toFixed(1)}

RECENT PERFORMANCE (last 7 days):
${last7DaysSummary}

HABITS:
${habits
  .map((h) => `- ${h.title}: ${h.completed ? 'Done' : 'Not done'} | streak ${h.streak}`)
  .join('\n')}

USER QUESTION:
${userMessage}

Respond like a personal discipline coach.
`;
};
