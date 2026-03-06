import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const WelcomePage = () => {
    return (
        <div style={styles.wrapper}>
            {/* Animated background orbs */}
            <div style={styles.orb1} />
            <div style={styles.orb2} />
            <div style={styles.orb3} />

            <div style={styles.container}>
                {/* Header */}
                <nav style={styles.nav}>
                    <div style={styles.logo}>
                        <span style={styles.logoIcon}>🎓</span>
                        <span style={styles.logoText}>EduDash</span>
                    </div>
                    <div style={styles.navLinks}>
                        <Link to="/login" className="btn btn-outline" style={{ padding: '10px 22px', fontSize: '0.9rem' }}>
                            Login
                        </Link>
                        <Link to="/register" className="btn btn-primary" style={{ padding: '10px 22px', fontSize: '0.9rem' }}>
                            Get Started
                        </Link>
                    </div>
                </nav>

                {/* Hero */}
                <div style={styles.hero}>
                    <div style={styles.heroBadge}>
                        <span>✨</span> The Smart Education Platform
                    </div>
                    <h1 style={styles.heroTitle}>
                        Empowering
                        <span style={styles.heroGradient}> Students</span>
                        <br />& <span style={styles.heroGradient2}>Teachers</span> Together
                    </h1>
                    <p style={styles.heroSubtitle}>
                        A unified dashboard built for modern education. Track progress, manage
                        classes, and collaborate — all in one beautiful place.
                    </p>
                    <div style={styles.heroButtons}>
                        <Link to="/register" className="btn btn-primary" style={{ fontSize: '1rem', padding: '14px 36px' }}>
                            🚀 Start Free
                        </Link>
                        <Link to="/login" className="btn btn-outline" style={{ fontSize: '1rem', padding: '14px 36px' }}>
                            Sign In
                        </Link>
                    </div>

                    {/* Stats row */}
                    <div style={styles.statsRow}>
                        {[
                            { value: '2 Roles', label: 'Student & Teacher' },
                            { value: '100%', label: 'Free to Use' },
                            { value: 'Live', label: 'Real-time Data' },
                        ].map((s, i) => (
                            <div key={i} style={styles.statItem}>
                                <span style={styles.statValue}>{s.value}</span>
                                <span style={styles.statLabel}>{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Feature Cards */}
                <div style={styles.featureGrid}>
                    <div className="card" style={styles.featureCard}>
                        <div style={{ ...styles.featureIcon, background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}>📚</div>
                        <h3 style={styles.featureTitle}>Student Dashboard</h3>
                        <p style={styles.featureDesc}>
                            View your enrolled courses, upcoming assignments, grades, and today's schedule at a glance.
                        </p>
                    </div>
                    <div className="card" style={styles.featureCard}>
                        <div style={{ ...styles.featureIcon, background: 'linear-gradient(135deg, #06b6d4, #0891b2)' }}>🧑‍🏫</div>
                        <h3 style={styles.featureTitle}>Teacher Dashboard</h3>
                        <p style={styles.featureDesc}>
                            Manage your classes, monitor students, review submissions, and track academic performance.
                        </p>
                    </div>
                    <div className="card" style={styles.featureCard}>
                        <div style={{ ...styles.featureIcon, background: 'linear-gradient(135deg, #10b981, #059669)' }}>🔐</div>
                        <h3 style={styles.featureTitle}>Role-Based Access</h3>
                        <p style={styles.featureDesc}>
                            Every user gets a personalized experience based on their role. Register, login, and go!
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <footer style={styles.footer}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        © 2026 EduDash. Built with Spring Boot & React.
                    </p>
                </footer>
            </div>
        </div>
    );
};

const styles = {
    wrapper: {
        minHeight: '100vh',
        background: 'var(--bg-dark)',
        position: 'relative',
        overflow: 'hidden',
    },
    orb1: {
        position: 'fixed', top: '-150px', right: '-100px',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
    },
    orb2: {
        position: 'fixed', bottom: '-100px', left: '-100px',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
    },
    orb3: {
        position: 'fixed', top: '40%', left: '30%',
        width: '300px', height: '300px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
    },
    container: {
        maxWidth: '1100px', margin: '0 auto', padding: '0 24px',
        position: 'relative', zIndex: 1,
    },
    nav: {
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '24px 0',
    },
    logo: { display: 'flex', alignItems: 'center', gap: '10px' },
    logoIcon: { fontSize: '1.8rem' },
    logoText: {
        fontSize: '1.5rem', fontWeight: 800,
        background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
    },
    navLinks: { display: 'flex', gap: '12px' },
    hero: { textAlign: 'center', padding: '80px 0 60px' },
    heroBadge: {
        display: 'inline-flex', alignItems: 'center', gap: '6px',
        background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)',
        borderRadius: '999px', padding: '6px 18px', fontSize: '0.85rem',
        color: 'var(--primary-light)', fontWeight: 500, marginBottom: '28px',
    },
    heroTitle: {
        fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, lineHeight: 1.15,
        marginBottom: '24px', color: 'var(--text-primary)',
    },
    heroGradient: {
        background: 'linear-gradient(135deg, #6366f1, #a5b4fc)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
    },
    heroGradient2: {
        background: 'linear-gradient(135deg, #06b6d4, #67e8f9)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
    },
    heroSubtitle: {
        fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: '600px',
        margin: '0 auto 40px', lineHeight: 1.7,
    },
    heroButtons: { display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '60px' },
    statsRow: {
        display: 'flex', gap: '40px', justifyContent: 'center', flexWrap: 'wrap',
        padding: '28px 32px',
        background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)',
    },
    statItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' },
    statValue: { fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-light)' },
    statLabel: { fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 },
    featureGrid: {
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px', marginTop: '0', paddingBottom: '60px',
    },
    featureCard: { display: 'flex', flexDirection: 'column', gap: '14px' },
    featureIcon: {
        width: '52px', height: '52px', borderRadius: '14px',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem',
    },
    featureTitle: { fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' },
    featureDesc: { fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.65 },
    footer: { textAlign: 'center', padding: '24px 0 40px', borderTop: '1px solid var(--border)' },
};

export default WelcomePage;
