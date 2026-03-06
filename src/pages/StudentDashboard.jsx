import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiGet } from '../utils/api';
import { getUser, removeUser } from '../utils/auth';

const StudentDashboard = () => {
    const navigate = useNavigate();
    const user = getUser();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        apiGet('/api/student/dashboard').then(({ ok, data }) => {
            if (ok) setData(data);
            setLoading(false);
        });
    }, []);

    const handleLogout = () => {
        removeUser();
        navigate('/login');
    };

    if (loading) return <div style={styles.loading}><div style={styles.spinner} />Loading your dashboard...</div>;

    const tabs = ['overview', 'courses', 'assignments', 'grades'];

    return (
        <div style={styles.wrapper}>
            {/* Sidebar */}
            <div style={styles.sidebar}>
                <div style={styles.sidebarLogo}>
                    <span>🎓</span>
                    <span style={styles.logoText}>EduDash</span>
                </div>
                <div style={styles.userInfo}>
                    <div style={styles.avatar}>{user?.name?.[0]?.toUpperCase()}</div>
                    <div>
                        <div style={styles.userName}>{user?.name}</div>
                        <div style={styles.userRole}>
                            <span className="badge badge-primary">📚 Student</span>
                        </div>
                    </div>
                </div>
                <nav style={styles.sideNav}>
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{ ...styles.navItem, ...(activeTab === tab ? styles.navItemActive : {}) }}
                        >
                            {tab === 'overview' && '📊'}
                            {tab === 'courses' && '📚'}
                            {tab === 'assignments' && '📝'}
                            {tab === 'grades' && '🏆'}
                            {' '}{tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </nav>
                <button className="btn" onClick={handleLogout} style={styles.logoutBtn}>
                    🚪 Logout
                </button>
            </div>

            {/* Main content */}
            <div style={styles.main}>
                {/* Header */}
                <div style={styles.header}>
                    <div>
                        <h1 style={styles.pageTitle}>
                            {activeTab === 'overview' && 'My Overview'}
                            {activeTab === 'courses' && 'My Courses'}
                            {activeTab === 'assignments' && 'Assignments'}
                            {activeTab === 'grades' && 'Grades & Results'}
                        </h1>
                        <p style={styles.pageSubtitle}>Welcome back, {user?.name}! 👋</p>
                    </div>
                </div>

                {/* Overview Tab */}
                {activeTab === 'overview' && data && (
                    <>
                        {/* Stat Cards */}
                        <div style={styles.statsGrid}>
                            {[
                                { icon: '📈', label: 'GPA', value: data.stats.gpa, color: '#6366f1' },
                                { icon: '✅', label: 'Attendance', value: `${data.stats.attendancePercent}%`, color: '#10b981' },
                                { icon: '📝', label: 'Completed', value: `${data.stats.completedAssignments}/${data.stats.totalAssignments}`, color: '#06b6d4' },
                                { icon: '📚', label: 'Courses', value: data.courses.length, color: '#f59e0b' },
                            ].map((s, i) => (
                                <div key={i} className="card" style={{ ...styles.statCard, borderTop: `3px solid ${s.color}` }}>
                                    <span style={{ fontSize: '1.8rem' }}>{s.icon}</span>
                                    <div style={styles.statVal}>{s.value}</div>
                                    <div style={styles.statLabel}>{s.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Today's Schedule + Assignments */}
                        <div style={styles.twoCol}>
                            <div className="card">
                                <h3 style={styles.cardTitle}>📅 Today's Schedule</h3>
                                <div style={styles.list}>
                                    {data.todaySchedule.map((s, i) => (
                                        <div key={i} style={styles.listItem}>
                                            <div style={styles.timeBadge}>{s.time}</div>
                                            <div>
                                                <div style={styles.listTitle}>{s.subject}</div>
                                                <div style={styles.listSub}>{s.room}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="card">
                                <h3 style={styles.cardTitle}>🚨 Upcoming Assignments</h3>
                                <div style={styles.list}>
                                    {data.assignments.slice(0, 3).map((a, i) => (
                                        <div key={i} style={styles.listItem}>
                                            <div style={{ flexShrink: 0 }}>
                                                <span className={`badge ${a.status === 'In Progress' ? 'badge-info' : a.status === 'Pending' ? 'badge-warning' : 'badge-danger'}`}>
                                                    {a.status}
                                                </span>
                                            </div>
                                            <div>
                                                <div style={styles.listTitle}>{a.title}</div>
                                                <div style={styles.listSub}>Due: {a.dueDate}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* Courses Tab */}
                {activeTab === 'courses' && data && (
                    <div style={styles.courseGrid}>
                        {data.courses.map((c, i) => (
                            <div key={i} className="card" style={styles.courseCard}>
                                <div style={{ ...styles.courseIcon, background: ['linear-gradient(135deg,#6366f1,#4f46e5)', 'linear-gradient(135deg,#06b6d4,#0891b2)', 'linear-gradient(135deg,#10b981,#059669)', 'linear-gradient(135deg,#f59e0b,#d97706)'][i % 4] }}>
                                    {['📐', '⚛️', '💻', '📖'][i % 4]}
                                </div>
                                <h3 style={styles.courseName}>{c.name}</h3>
                                <p style={styles.courseInstructor}>{c.instructor}</p>
                                <div style={styles.progressBar}>
                                    <div style={{ ...styles.progressFill, width: c.progress, background: ['#6366f1', '#06b6d4', '#10b981', '#f59e0b'][i % 4] }} />
                                </div>
                                <div style={styles.progressLabel}>Progress: {c.progress}</div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Assignments Tab */}
                {activeTab === 'assignments' && data && (
                    <div className="card">
                        <h3 style={styles.cardTitle}>All Assignments</h3>
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    {['Title', 'Subject', 'Due Date', 'Status'].map(h => (
                                        <th key={h} style={styles.th}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.assignments.map((a, i) => (
                                    <tr key={i} style={styles.tr}>
                                        <td style={styles.td}>{a.title}</td>
                                        <td style={styles.td}>{a.subject}</td>
                                        <td style={styles.td}>{a.dueDate}</td>
                                        <td style={styles.td}>
                                            <span className={`badge ${a.status === 'In Progress' ? 'badge-info' : a.status === 'Pending' ? 'badge-warning' : 'badge-danger'}`}>
                                                {a.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Grades Tab */}
                {activeTab === 'grades' && data && (
                    <div style={styles.courseGrid}>
                        {data.grades.map((g, i) => (
                            <div key={i} className="card" style={styles.gradeCard}>
                                <div style={styles.gradeCircle}>{g.grade}</div>
                                <div style={styles.gradeSub}>{g.subject}</div>
                                <div style={styles.gradeScore}>{g.score}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    wrapper: { display: 'flex', minHeight: '100vh', background: 'var(--bg-dark)' },
    loading: {
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: '16px', color: 'var(--text-secondary)', fontSize: '1.1rem', flexDirection: 'column',
    },
    spinner: {
        width: '40px', height: '40px', border: '3px solid var(--border)',
        borderTop: '3px solid var(--primary)', borderRadius: '50%',
        animation: 'spin 1s linear infinite',
    },
    sidebar: {
        width: '260px', minWidth: '260px', background: 'var(--bg-card)',
        borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column',
        padding: '24px', gap: '24px', minHeight: '100vh',
    },
    sidebarLogo: { display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.4rem' },
    logoText: {
        fontWeight: 800, fontSize: '1.3rem',
        background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
    },
    userInfo: {
        display: 'flex', alignItems: 'center', gap: '12px',
        padding: '16px', background: 'var(--bg-card2)', borderRadius: 'var(--radius)',
        border: '1px solid var(--border)',
    },
    avatar: {
        width: '44px', height: '44px', borderRadius: '50%',
        background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 800, fontSize: '1.2rem',
    },
    userName: { fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '4px' },
    userRole: {},
    sideNav: { display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 },
    navItem: {
        display: 'flex', alignItems: 'center', gap: '10px',
        padding: '12px 14px', borderRadius: 'var(--radius)',
        background: 'none', border: 'none', color: 'var(--text-secondary)',
        cursor: 'pointer', fontSize: '0.95rem', fontWeight: 500,
        textAlign: 'left', transition: 'all 0.2s',
        fontFamily: 'Inter, sans-serif', textTransform: 'capitalize',
    },
    navItemActive: {
        background: 'rgba(99,102,241,0.15)',
        color: 'var(--primary-light)', fontWeight: 600,
    },
    logoutBtn: {
        background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
        color: '#f87171', borderRadius: 'var(--radius)', padding: '11px',
        cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'Inter, sans-serif',
    },
    main: { flex: 1, padding: '32px', overflowY: 'auto' },
    header: { marginBottom: '32px' },
    pageTitle: { fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' },
    pageSubtitle: { color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '4px' },
    statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px', marginBottom: '28px' },
    statCard: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', textAlign: 'center' },
    statVal: { fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' },
    statLabel: { fontSize: '0.85rem', color: 'var(--text-secondary)' },
    twoCol: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' },
    cardTitle: { fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' },
    list: { display: 'flex', flexDirection: 'column', gap: '12px' },
    listItem: { display: 'flex', alignItems: 'flex-start', gap: '12px' },
    timeBadge: {
        background: 'rgba(99,102,241,0.15)', color: 'var(--primary-light)',
        borderRadius: 'var(--radius)', padding: '4px 10px', fontSize: '0.8rem',
        fontWeight: 600, whiteSpace: 'nowrap',
    },
    listTitle: { fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' },
    listSub: { fontSize: '0.8rem', color: 'var(--text-muted)' },
    courseGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' },
    courseCard: { display: 'flex', flexDirection: 'column', gap: '10px' },
    courseIcon: {
        width: '50px', height: '50px', borderRadius: '14px',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem',
    },
    courseName: { fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' },
    courseInstructor: { fontSize: '0.85rem', color: 'var(--text-secondary)' },
    progressBar: { height: '6px', background: 'var(--bg-card2)', borderRadius: '3px', overflow: 'hidden' },
    progressFill: { height: '100%', borderRadius: '3px', transition: 'width 0.8s ease' },
    progressLabel: { fontSize: '0.8rem', color: 'var(--text-muted)' },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: {
        padding: '12px 16px', background: 'var(--bg-card2)', color: 'var(--text-secondary)',
        fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', textAlign: 'left',
        borderBottom: '1px solid var(--border)',
    },
    tr: { borderBottom: '1px solid var(--border)', transition: 'background 0.2s' },
    td: { padding: '14px 16px', color: 'var(--text-primary)', fontSize: '0.9rem' },
    gradeCard: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', textAlign: 'center' },
    gradeCircle: {
        width: '80px', height: '80px', borderRadius: '50%',
        background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.6rem', fontWeight: 900, color: '#fff',
    },
    gradeSub: { fontWeight: 700, color: 'var(--text-primary)' },
    gradeScore: { fontSize: '0.85rem', color: 'var(--text-secondary)' },
};

export default StudentDashboard;
