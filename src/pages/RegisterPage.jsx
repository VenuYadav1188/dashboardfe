import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiPost } from '../utils/api';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: '', email: '', password: '', role: 'STUDENT' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.password) {
            setError('Please fill in all fields.');
            return;
        }
        if (form.password.length < 6) {
            setError('Password must be at least 6 characters.');
            return;
        }
        setLoading(true);
        try {
            const { ok, data } = await apiPost('/api/auth/register', form);
            if (ok && data.success) {
                setSuccess('Registration successful! Redirecting to login...');
                setTimeout(() => navigate('/login'), 1800);
            } else {
                setError(data.message || 'Registration failed.');
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

                <h1 style={styles.title}>Create your account</h1>
                <p style={styles.subtitle}>Join thousands of students and teachers</p>

                {error && <div className="alert alert-error">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Full Name</label>
                        <input
                            type="text" name="name"
                            placeholder="John Doe"
                            value={form.name} onChange={handleChange}
                        />
                    </div>
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
                            placeholder="Minimum 6 characters"
                            value={form.password} onChange={handleChange}
                        />
                    </div>

                    {/* Role selection */}
                    <div style={styles.roleLabel}>Choose your role</div>
                    <div style={styles.roleGrid}>
                        <button
                            type="button"
                            onClick={() => setForm({ ...form, role: 'STUDENT' })}
                            style={{
                                ...styles.roleBtn,
                                ...(form.role === 'STUDENT' ? styles.roleBtnActive : {}),
                            }}
                        >
                            <span style={styles.roleEmoji}>📚</span>
                            <span style={styles.roleTitle}>Student</span>
                            <span style={styles.roleDesc}>I'm here to learn</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setForm({ ...form, role: 'TEACHER' })}
                            style={{
                                ...styles.roleBtn,
                                ...(form.role === 'TEACHER' ? styles.roleBtnActiveTeacher : {}),
                            }}
                        >
                            <span style={styles.roleEmoji}>🧑‍🏫</span>
                            <span style={styles.roleTitle}>Teacher</span>
                            <span style={styles.roleDesc}>I'm here to teach</span>
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: '100%', padding: '14px', fontSize: '1rem', marginTop: '16px' }}
                        disabled={loading}
                    >
                        {loading ? '⏳ Creating account...' : '✓ Create Account'}
                    </button>
                </form>

                <p style={styles.switchText}>
                    Already have an account?{' '}
                    <Link to="/login" style={styles.link}>Sign in</Link>
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
        position: 'fixed', top: '-100px', left: '-80px', width: '450px', height: '450px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)', pointerEvents: 'none',
    },
    orb2: {
        position: 'fixed', bottom: '-100px', right: '-80px', width: '400px', height: '400px', borderRadius: '50%',
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
    roleLabel: {
        fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)',
        textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px',
    },
    roleGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' },
    roleBtn: {
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
        padding: '18px 12px', borderRadius: 'var(--radius)',
        background: 'var(--bg-card2)', border: '2px solid var(--border)',
        cursor: 'pointer', transition: 'all 0.2s ease', color: 'var(--text-secondary)',
    },
    roleBtnActive: {
        border: '2px solid #6366f1', background: 'rgba(99,102,241,0.1)', color: 'var(--primary-light)',
    },
    roleBtnActiveTeacher: {
        border: '2px solid #06b6d4', background: 'rgba(6,182,212,0.1)', color: '#22d3ee',
    },
    roleEmoji: { fontSize: '1.6rem' },
    roleTitle: { fontSize: '0.9rem', fontWeight: 700 },
    roleDesc: { fontSize: '0.75rem', opacity: 0.75 },
    switchText: { textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '20px' },
    link: { color: 'var(--primary-light)', textDecoration: 'none', fontWeight: 600 },
};

export default RegisterPage;
