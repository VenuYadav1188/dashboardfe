import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiGet } from '../utils/api';
import { getUser, removeUser } from '../utils/auth';

const TeacherDashboard = () => {
    const navigate = useNavigate();
    const user = getUser();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        apiGet('/api/teacher/dashboard').then(({ ok, data }) => {
            if (ok) setData(data);
            setLoading(false);
        });
    }, []);

    const handleLogout = () => {
        removeUser();
        navigate('/login');
    };

    if (loading) return <div style={styles.loading}><div style={styles.spinner} />Loading your dashboard...</div>;

    const tabs = ['overview', 'classes', 'students', 'assignments'];

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
                            <span className="badge badge-info">🧑‍🏫 Teacher</span>
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
                            {tab === 'classes' && '🏫'}
                            {tab === 'students' && '👥'}
                            {tab === 'assignments' && '📋'}
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
                            {activeTab === 'overview' && 'Overview'}
                            {activeTab === 'classes' && 'My Classes'}
                            {activeTab === 'students' && 'Students'}
                            {activeTab === 'assignments' && 'Pending Assignments'}
                        </h1>
                        <p style={styles.pageSubtitle}>Good day, {user?.name}! Here's your teaching dashboard. 🧑‍🏫</p>
                    </div>
                </div>

                {/* Overview Tab */}
                {activeTab === 'overview' && data && (
                    <>
                        {/* Stat Cards */}
                        <div style={styles.statsGrid}>
                            {[
                                { icon: '👥', label: 'Total Students', value: data.stats.totalStudents, color: '#6366f1' },
                                { icon: '🏫', label: 'Classes', value: data.stats.totalClasses, color: '#06b6d4' },
                                { icon: '📊', label: 'Avg. Score', value: data.stats.averageClassScore, color: '#10b981' },
                                { icon: '📋', label: 'Pending Reviews', value: data.stats.assignmentsPendingReview, color: '#f59e0b' },
                            ].map((s, i) => (
                                <div key={i} className="card" style={{ ...styles.statCard, borderTop: `3px solid ${s.color}` }}>
                                    <span style={{ fontSize: '1.8rem' }}>{s.icon}</span>
                                    <div style={styles.statVal}>{s.value}</div>
                                    <div style={styles.statLabel}>{s.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Two columns: Classes + Announcements */}
                        <div style={styles.twoCol}>
                            <div className="card">
                                <h3 style={styles.cardTitle}>🏫 My Classes</h3>
                                <div style={styles.list}>
                                    {data.classes.map((c, i) => (
                                        <div key={i} style={styles.classItem}>
                                            <div style={{ ...styles.classIcon, background: ['linear-gradient(135deg,#6366f1,#4f46e5)', 'linear-gradient(135deg,#06b6d4,#0891b2)', 'linear-gradient(135deg,#10b981,#059669)'][i % 3] }}>
                                                🏫
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={styles.listTitle}>{c.name}</div>
                                                <div style={styles.listSub}>{c.schedule} · {c.room}</div>
                                            </div>
                                            <span className="badge badge-primary">{c.students} students</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="card">
                                <h3 style={styles.cardTitle}>📢 Announcements</h3>
                                <div style={styles.list}>
                                    {data.announcements.map((a, i) => (
                                        <div key={i} style={styles.announcementItem}>
                                            <div style={styles.annIcon}>📌</div>
                                            <div>
                                                <div style={styles.listTitle}>{a.title}</div>
                                                <div style={styles.listSub}>{a.desc}</div>
                                                <div style={{ ...styles.listSub, color: 'var(--primary-light)', marginTop: '3px' }}>{a.date}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* Classes Tab */}
                {activeTab === 'classes' && data && (
                    <div style={styles.classGrid}>
                        {data.classes.map((c, i) => (
                            <div key={i} className="card" style={styles.classCard}>
                                <div style={{ ...styles.classCardIcon, background: ['linear-gradient(135deg,#6366f1,#4f46e5)', 'linear-gradient(135deg,#06b6d4,#0891b2)', 'linear-gradient(135deg,#10b981,#059669)'][i % 3] }}>
                                    🏫
                                </div>
                                <h3 style={styles.courseName}>{c.name}</h3>
                                <div style={styles.classDetail}><strong>{c.students}</strong> Students enrolled</div>
                                <div style={styles.classDetail}>📍 {c.room}</div>
                                <div style={styles.classDetail}>🕐 {c.schedule}</div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Students Tab */}
                {activeTab === 'students' && data && (
                    <div className="card">
                        <h3 style={styles.cardTitle}>Student Roster</h3>
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    {['Name', 'Class', 'Grade', 'Status'].map(h => (
                                        <th key={h} style={styles.th}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.recentStudents.map((s, i) => (
                                    <tr key={i} style={styles.tr}>
                                        <td style={styles.td}>
                                            <div style={styles.studentCell}>
                                                <div style={styles.studentAvatar}>{s.name[0]}</div>
                                                {s.name}
                                            </div>
                                        </td>
                                        <td style={styles.td}>{s.class}</td>
                                        <td style={styles.td}>
                                            <span className="badge badge-primary">{s.grade}</span>
                                        </td>
                                        <td style={styles.td}>
                                            <span className={`badge ${s.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>
                                                {s.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Assignments Tab */}
                {activeTab === 'assignments' && data && (
                    <div style={styles.classGrid}>
                        {data.pendingAssignments.map((a, i) => (
                            <div key={i} className="card" style={styles.assignCard}>
                                <div style={styles.assignHeader}>
                                    <span className="badge badge-warning">Pending Review</span>
                                    <span style={styles.dueDate}>Due: {a.dueDate}</span>
                                </div>
                                <h3 style={styles.assignTitle}>{a.title}</h3>
                                <p style={styles.assignClass}>{a.class}</p>
                                <div style={styles.submissionBar}>
                                    <div style={styles.submissionFill(Math.round((a.submitted / a.total) * 100))} />
                                </div>
                                <div style={styles.submissionLabel}>
                                    {a.submitted}/{a.total} submitted ({Math.round((a.submitted / a.total) * 100)}%)
                                </div>
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
        borderTop: '3px solid #06b6d4', borderRadius: '50%',
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
        background: 'linear-gradient(135deg, #06b6d4, #6366f1)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
    },
    userInfo: {
        display: 'flex', alignItems: 'center', gap: '12px',
        padding: '16px', background: 'var(--bg-card2)', borderRadius: 'var(--radius)',
        border: '1px solid var(--border)',
    },
    avatar: {
        width: '44px', height: '44px', borderRadius: '50%',
        background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
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
        background: 'rgba(6,182,212,0.15)', color: '#22d3ee', fontWeight: 600,
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
    classItem: { display: 'flex', alignItems: 'center', gap: '12px' },
    classIcon: {
        width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem',
    },
    listTitle: { fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' },
    listSub: { fontSize: '0.8rem', color: 'var(--text-muted)' },
    announcementItem: { display: 'flex', gap: '10px', alignItems: 'flex-start' },
    annIcon: { fontSize: '1.2rem', flexShrink: 0 },
    classGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' },
    classCard: { display: 'flex', flexDirection: 'column', gap: '10px' },
    classCardIcon: {
        width: '52px', height: '52px', borderRadius: '14px',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem',
    },
    courseName: { fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' },
    classDetail: { fontSize: '0.85rem', color: 'var(--text-secondary)' },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: {
        padding: '12px 16px', background: 'var(--bg-card2)', color: 'var(--text-secondary)',
        fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', textAlign: 'left',
        borderBottom: '1px solid var(--border)',
    },
    tr: { borderBottom: '1px solid var(--border)' },
    td: { padding: '14px 16px', color: 'var(--text-primary)', fontSize: '0.9rem' },
    studentCell: { display: 'flex', alignItems: 'center', gap: '10px' },
    studentAvatar: {
        width: '32px', height: '32px', borderRadius: '50%',
        background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 700, fontSize: '0.9rem',
    },
    assignCard: { display: 'flex', flexDirection: 'column', gap: '12px' },
    assignHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    dueDate: { fontSize: '0.8rem', color: 'var(--text-muted)' },
    assignTitle: { fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' },
    assignClass: { fontSize: '0.85rem', color: 'var(--text-secondary)' },
    submissionBar: { height: '6px', background: 'var(--bg-card2)', borderRadius: '3px', overflow: 'hidden' },
    submissionFill: (pct) => ({
        height: '100%', width: `${pct}%`,
        background: 'linear-gradient(90deg, #06b6d4, #6366f1)', borderRadius: '3px',
    }),
    submissionLabel: { fontSize: '0.8rem', color: 'var(--text-muted)' },
};

export default TeacherDashboard;
