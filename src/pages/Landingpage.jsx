import { Link } from 'react-router-dom';

import {
  FiArrowRight,
  FiActivity,
  FiBarChart2,
  FiMessageCircle,
  FiTarget,
  FiSend,
} from 'react-icons/fi';

import '../styles/landing.scss';

export default function Landing() {
  return (
    <div className="landing">
      {/* BACKGROUND GLOW */}
      <div className="bg-glow" />

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="badge">ASCEND</h1>

          <p>
            A modern AI-powered habit system designed to help you stay consistent, track progress,
            and improve every single day.
          </p>

          <div className="actions">
            <Link to="/signup" className="btn primary">
              Get Started <FiArrowRight />
            </Link>

            <a href="https://t.me/eclbyte" target="_blank" rel="noreferrer" className="btn ghost">
              Contact Telegram <FiSend />
            </a>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="section-title">
          <h2>Everything you need to stay consistent</h2>
          <p>Simple systems that turn effort into identity.</p>
        </div>

        <div className="grid">
          {[
            {
              icon: <FiActivity />,
              title: 'Habit Tracking',
              desc: 'Track habits with zero friction and full clarity.',
            },
            {
              icon: <FiBarChart2 />,
              title: 'Progress Analytics',
              desc: 'See patterns that actually matter.',
            },
            {
              icon: <FiMessageCircle />,
              title: 'AI Coach',
              desc: 'Personal feedback based on your behavior.',
            },
            {
              icon: <FiTarget />,
              title: 'Goal System',
              desc: 'Break big goals into daily execution.',
            },
          ].map((item, i) => (
            <div className="card" key={i}>
              <div className="icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* VALUE */}
      <section className="value">
        <div className="value-box">
          <h2>Small actions → massive outcomes</h2>

          <p>Discipline is not motivation. It is identity built through repetition.</p>

          <div className="stats">
            <div>
              <strong>10K+</strong>
              <span>Habits tracked</span>
            </div>

            <div>
              <strong>95%</strong>
              <span>Consistency rate</span>
            </div>

            <div>
              <strong>24/7</strong>
              <span>AI guidance</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="cta-box">
          <h2>Start building your system today</h2>
          <p>No noise. No distraction. Just consistency.</p>

          <Link to="/signup" className="btn primary large">
            Create Free Account <FiArrowRight />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <h3>Ascend</h3>
          <p>Discipline compounds.</p>

          <a href="https://t.me/eclbyte" target="_blank" rel="noreferrer">
            Telegram: @eclbyte
          </a>
        </div>
      </footer>
    </div>
  );
}
