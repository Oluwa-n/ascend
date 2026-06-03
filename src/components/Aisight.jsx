import React, { useEffect, useState, useRef } from 'react';
import '../styles/insight.scss';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { getHabits } from '../services/habits';
import { askGemini } from '../services/gemini';
import { buildCoachPrompt } from '../services/promptBuilder';
import { getUserMemory, updateUserMemory } from '../services/memory';

import { FiSend, FiArrowLeft } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

export default function Ainsight() {
  const userId = 'demo-user';

  const [habits, setHabits] = useState([]);
  const [memory, setMemory] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages, loading]);

  const loadData = async () => {
    try {
      const [habitData, memoryData] = await Promise.all([getHabits(), getUserMemory(userId)]);

      setHabits(habitData);
      setMemory(memoryData);
    } catch (error) {
      console.error('Failed loading chat data:', error);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();

    setInput('');

    setMessages((prev) => [
      ...prev,
      {
        role: 'user',
        text: userMsg,
      },
    ]);

    setLoading(true);

    try {
      const prompt = buildCoachPrompt({
        habits,
        userMessage: userMsg,
        memory,
      });

      const reply = await askGemini(prompt);

      setMessages((prev) => [
        ...prev,
        {
          role: 'ai',
          text: reply || 'No response generated.',
        },
      ]);

      try {
        await updateUserMemory(userId, {
          summary: `User asked: ${userMsg}`,
        });
      } catch (memoryError) {
        console.error('Memory update failed:', memoryError);
      }
    } catch (error) {
      console.error('Gemini Error:', error);

      setMessages((prev) => [
        ...prev,
        {
          role: 'ai',
          text: 'Unable to generate a response right now. Please try again.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-app">
      <header className="chat-header">
        <NavLink to="/home" className="back-btn">
          <FiArrowLeft size={18} />
        </NavLink>

        <h2>AI Habit Coach</h2>
      </header>

      <main className="chat-body">
        {messages.length === 0 && (
          <div className="empty-state">
            <h3>AI Habit Coach</h3>

            <p>
              Ask questions about your habits, streaks, productivity, consistency, motivation or
              routines.
            </p>
          </div>
        )}

        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            {message.role === 'ai' ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.text}</ReactMarkdown>
            ) : (
              message.text
            )}
          </div>
        ))}

        {loading && (
          <div className="typing">
            <span />
            <span />
            <span />
          </div>
        )}

        <div ref={bottomRef} />
      </main>

      <footer className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about your habits..."
          disabled={loading}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !loading) {
              sendMessage();
            }
          }}
        />

        <button onClick={sendMessage} disabled={loading}>
          <FiSend size={18} />
        </button>
      </footer>
    </div>
  );
}
