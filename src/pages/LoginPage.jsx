import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiPost } from '../utils/api';
import { setUser } from '../utils/auth';

const LoginPage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.email || !form.password) {
            setError('Please fill in all fields.');
            return;
        }
        setLoading(true);
        try {
            const { ok, data } = await apiPost('/api/auth/login', form);
            if (ok && data.success) {
                setUser({ name: data.name, email: data.email, role: data.role });
                if (data.role === 'STUDENT') navigate('/student/dashboard');
                else navigate('/teacher/dashboard');
            } else {
                setError(data.message || 'Login failed.');
            }
        } catch (err) {
            setError('Cannot connect to server. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.wrapper}>
            <div style={styles.orb1} />
            <div style={styles.orb2} />

            <div style={styles.card}>
                <Link to="/" style={styles.backLink}>← Back to Home</Link>

                <div style={styles.logoRow}>
                    <span style={{ fontSize: '2.2rem' }}>🎓</span>
                    <span style={styles.logoText}>EduDash</span>
                </div>

                <h1 style={styles.title}>Welcome back</h1>
                <p style={styles.subtitle}>Sign in to your account to continue</p>

                {error && <div className="alert alert-error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Email Address</label>
                        <input
                            type="email" name="email"
                            placeholder="you@example.com"
                            value={form.email} onChange={handleChange}
                        />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password" name="password"
                            placeholder="Your password"
                            value={form.password} onChange={handleChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: '100%', padding: '14px', fontSize: '1rem', marginTop: '8px' }}
                        disabled={loading}
                    >
                        {loading ? '⏳ Signing in...' : '→ Sign In'}
                    </button>
                </form>

                <div style={styles.divider}>
                    <span>or</span>
                </div>

                <div style={styles.roleHint}>
                    <div style={styles.roleCard}>
                        <span>📚</span>
                        <div>
                            <strong>Student</strong>
                            <p>Access your courses & grades</p>
                        </div>
                    </div>
                    <div style={styles.roleCard}>
                        <span>🧑‍🏫</span>
                        <div>
                            <strong>Teacher</strong>
                            <p>Manage classes & students</p>
                        </div>
                    </div>
                </div>

                <p style={styles.switchText}>
                    Don't have an account?{' '}
                    <Link to="/register" style={styles.link}>Register here</Link>
                </p>
            </div>
        </div>
    );
};

const styles = {
    wrapper: {
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--bg-dark)', position: 'relative', overflow: 'hidden', padding: '24px',
    },
    orb1: {
        position: 'fixed', top: '-100px', right: '-80px', width: '450px', height: '450px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)', pointerEvents: 'none',
    },
    orb2: {
        position: 'fixed', bottom: '-100px', left: '-80px', width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)', pointerEvents: 'none',
    },
    card: {
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: '24px', padding: '40px', width: '100%', maxWidth: '460px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)', position: 'relative', zIndex: 1,
    },
    backLink: {
        color: 'var(--text-muted)', fontSize: '0.85rem', textDecoration: 'none',
        display: 'inline-block', marginBottom: '24px',
    },
    logoRow: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' },
    logoText: {
        fontSize: '1.4rem', fontWeight: 800,
        background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
    },
    title: { fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' },
    subtitle: { fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '28px' },
    divider: {
        textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem',
        margin: '24px 0', position: 'relative',
    },
    roleHint: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' },
    roleCard: {
        display: 'flex', alignItems: 'flex-start', gap: '10px',
        background: 'var(--bg-card2)', borderRadius: 'var(--radius)',
        padding: '14px', border: '1px solid var(--border)', fontSize: '0.82rem',
        color: 'var(--text-secondary)', '& strong': { color: 'var(--text-primary)' },
    },
    switchText: { textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '8px' },
    link: { color: 'var(--primary-light)', textDecoration: 'none', fontWeight: 600 },
};

export default LoginPage;
