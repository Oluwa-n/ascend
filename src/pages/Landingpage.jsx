import { Link } from 'react-router-dom';

import {
  FiArrowRight,
  FiActivity,
  FiTrendingUp,
  FiMessageCircle,
  FiCheckCircle,
  FiTarget,
  FiAward,
  FiBarChart2,
} from 'react-icons/fi';

import '../styles/landing.scss';

export default function Landing() {
  return (
    <div className="landing-page">
      {/* HERO */}

      <section className="hero">
        <div className="hero-main">
          <div className="hero-content">
            <span className="hero-badge">✨ AI Powered Habit Tracking</span>

            <h1>
              Discipline Builds
              <span>The Life You Want.</span>
            </h1>

            <p>
              Build powerful habits, maintain streaks, track your progress and receive personalized
              AI coaching designed to keep you accountable.
            </p>

            <div className="hero-actions">
              <Link to="/signup" className="primary-btn">
                Create Account
                <FiArrowRight />
              </Link>

              <Link to="/login" className="secondary-btn">
                Sign In
              </Link>
            </div>
          </div>

          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1600&auto=format&fit=crop"
              alt="Discipline and growth"
            />

            <div className="floating-card card-one">🔥 19 Day Streak</div>

            <div className="floating-card card-two">+12 Habits Completed</div>
          </div>
        </div>

        <div className="hero-metrics">
          <div className="metric-card">
            <h3>10K+</h3>
            <span>Habits Tracked</span>
          </div>

          <div className="metric-card">
            <h3>95%</h3>
            <span>Success Rate</span>
          </div>

          <div className="metric-card">
            <h3>24/7</h3>
            <span>AI Coach</span>
          </div>
        </div>
      </section>

      {/* VISION */}

      <section className="vision-section">
        <div className="vision-overlay" />

        <div className="vision-content">
          <h2>
            Your Future Is Built
            <br />
            By What You Do Daily.
          </h2>

          <p>Every workout. Every page read. Every early morning. Every promise kept.</p>
        </div>
      </section>

      {/* FEATURES */}

      <section className="features-section">
        <div className="section-header">
          <span>FEATURES</span>

          <h2>Everything Needed To Stay Consistent</h2>

          <p>Built for people serious about long-term growth and accountability.</p>
        </div>

        <div className="feature-grid">
          <div className="feature-card feature-large">
            <FiActivity size={42} />

            <h3>Habit Tracking</h3>

            <p>Track habits daily and maintain complete visibility over your progress.</p>
          </div>

          <div className="feature-card">
            <FiAward size={36} />

            <h3>Streak System</h3>

            <p>Build momentum through streaks that reward consistency.</p>
          </div>

          <div className="feature-card">
            <FiBarChart2 size={36} />

            <h3>Insights & Analytics</h3>

            <p>Discover patterns and improve performance through meaningful statistics.</p>
          </div>

          <div className="feature-card">
            <FiMessageCircle size={36} />

            <h3>AI Habit Coach</h3>

            <p>Personalized guidance based on your real activity and consistency.</p>
          </div>

          <div className="feature-card">
            <FiTarget size={36} />

            <h3>Goal Focused</h3>

            <p>Turn ambitious goals into simple daily systems.</p>
          </div>

          <div className="feature-card">
            <FiTrendingUp size={36} />

            <h3>Growth Tracking</h3>

            <p>Watch your discipline compound week after week.</p>
          </div>
        </div>
      </section>

      {/* RESULTS */}

      <section className="results-section">
        <div className="results-content">
          <span>RESULTS</span>

          <h2>Discipline Changes Everything.</h2>

          <p>Small daily actions create extraordinary outcomes over time.</p>

          <div className="results-list">
            <div>
              <FiCheckCircle />
              Better Health
            </div>

            <div>
              <FiCheckCircle />
              Stronger Mindset
            </div>

            <div>
              <FiCheckCircle />
              Better Focus
            </div>

            <div>
              <FiCheckCircle />
              Career Growth
            </div>
          </div>
        </div>

        <div className="results-dashboard">
          <img
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop"
            alt="Success"
          />
        </div>
      </section>

      {/* AI */}

      <section className="ai-section">
        <div className="ai-info">
          <span>AI COACH</span>

          <h2>Your Personal Accountability Partner</h2>

          <p>Ask questions about your habits, productivity and consistency.</p>

          <ul>
            <li>Analyze your habits</li>
            <li>Identify weak points</li>
            <li>Improve consistency</li>
            <li>Stay accountable</li>
          </ul>
        </div>

        <div className="ai-demo">
          <div className="ai-chat">
            <div className="msg user">Why do I keep missing my reading habit?</div>

            <div className="msg ai">
              Your completion rate drops after 8 PM. Try moving reading to the morning.
            </div>

            <div className="msg user">What should I improve?</div>

            <div className="msg ai">
              Focus on consistency first. Completing one habit daily is better than missing five.
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}

      <section className="testimonials">
        <div className="section-header">
          <span>SUCCESS STORIES</span>

          <h2>Loved By People Building Better Habits</h2>
        </div>

        <div className="testimonial-grid">
          <div className="testimonial-card">
            <p>“I finally maintained a 60-day streak. This changed everything.”</p>

            <div className="testimonial-author">
              <div className="avatar">S</div>

              <div>
                <h4>Sarah K.</h4>
                <span>Product Designer</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <p>“The AI coach keeps me accountable every single day.”</p>

            <div className="testimonial-author">
              <div className="avatar">M</div>

              <div>
                <h4>Michael T.</h4>
                <span>Software Engineer</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <p>“The best habit tracker I have ever used.”</p>

            <div className="testimonial-author">
              <div className="avatar">D</div>

              <div>
                <h4>David A.</h4>
                <span>Entrepreneur</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="cta-section">
        <div className="cta-card">
          <h2>Start Building Better Habits Today</h2>

          <p>Your future self will thank you.</p>

          <Link to="/signup" className="primary-btn">
            Create Free Account
            <FiArrowRight />
          </Link>
        </div>
      </section>

      {/* FOOTER */}

      <footer className="footer">
        <h3>HabitFlow</h3>

        <p>Discipline is freedom.</p>

        <div className="footer-links">
          <Link to="/login">Login</Link>

          <Link to="/signup">Create Account</Link>
        </div>

        <span>© 2026 HabitFlow. All Rights Reserved.</span>
      </footer>
    </div>
  );
}
