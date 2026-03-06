import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../App.css';

const NAV = [
    { id: 'dashboard', icon: '🏠', label: 'Dashboard' },
    { id: 'courses', icon: '📚', label: 'Courses' },
    { id: 'students', icon: '👥', label: 'Students' },
    { id: 'assignments', icon: '📝', label: 'Assignments' },
    { id: 'grades', icon: '📊', label: 'Grade Book' },
    { id: 'announcements', icon: '📢', label: 'Announcements' },
    { id: 'profile', icon: '👤', label: 'Profile' },
];

const COURSES = [
    { id: 1, name: 'Mathematics III', students: 32, schedule: 'Mon/Wed 9AM', color: '#6c63ff', icon: '📐', progress: 65 },
    { id: 2, name: 'Calculus I', students: 28, schedule: 'Tue/Thu 11AM', color: '#f97316', icon: '📏', progress: 80 },
    { id: 3, name: 'Statistics', students: 24, schedule: 'Mon/Fri 2PM', color: '#43e0c2', icon: '📈', progress: 45 },
];

const STUDENTS = [
    { id: 1, name: 'Alice Johnson', email: 'alice@edu.com', grade: 'A', attendance: '96%', status: 'active' },
    { id: 2, name: 'Bob Martinez', email: 'bob@edu.com', grade: 'B+', attendance: '88%', status: 'active' },
    { id: 3, name: 'Carol Chen', email: 'carol@edu.com', grade: 'A+', attendance: '100%', status: 'active' },
    { id: 4, name: 'David Kim', email: 'david@edu.com', grade: 'C+', attendance: '72%', status: 'warning' },
    { id: 5, name: 'Emma Wilson', email: 'emma@edu.com', grade: 'B', attendance: '84%', status: 'active' },
];

const ASSIGNMENTS = [
    { id: 1, title: 'Midterm Exam', course: 'Mathematics III', due: 'Mar 15', submitted: 28, total: 32, graded: 20 },
    { id: 2, title: 'Limits Problem Set', course: 'Calculus I', due: 'Mar 10', submitted: 26, total: 28, graded: 26 },
    { id: 3, title: 'Data Analysis Project', course: 'Statistics', due: 'Mar 20', submitted: 10, total: 24, graded: 0 },
];

const ANNOUNCEMENTS_DATA = [
    { id: 1, title: 'Mid-term Exam Schedule Posted', body: 'Please review the exam schedule on the portal.', time: '2 hours ago', color: '#6c63ff' },
    { id: 2, title: 'Office Hours Changed', body: 'Office hours this week: Thu 3-5PM instead of Fri.', time: '1 day ago', color: '#43e0c2' },
];

function Sidebar({ active, setActive, open, setOpen, userName, onLogout }) {
    return (
        <aside style={{
            width: open ? 240 : 68, minWidth: open ? 240 : 68,
            background: 'var(--bg-sidebar)', borderRight: '1px solid var(--border)',
            display: 'flex', flexDirection: 'column', transition: 'width 0.3s ease, min-width 0.3s ease', overflow: 'hidden',
        }}>
            <div style={{
                padding: open ? '22px 18px' : '22px 14px', borderBottom: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', gap: 12
            }}>
                <div style={{
                    width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                    background: 'linear-gradient(135deg, #f97316, #43e0c2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, fontWeight: 900
                }}>E</div>
                {open && <span style={{ fontSize: 17, fontWeight: 800, whiteSpace: 'nowrap' }}>Edu<span style={{ color: '#f97316' }}>Hub</span></span>}
            </div>
            <nav style={{ flex: 1, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: 3, overflowY: 'auto' }}>
                {NAV.map(item => (
                    <button key={item.id} onClick={() => setActive(item.id)} style={{
                        display: 'flex', alignItems: 'center', gap: 11,
                        padding: open ? '11px 12px' : '11px', borderRadius: 10, border: 'none', cursor: 'pointer',
                        background: active === item.id ? 'rgba(249,115,22,0.15)' : 'transparent',
                        color: active === item.id ? '#fb923c' : 'var(--text-secondary)',
                        fontWeight: active === item.id ? 600 : 400, transition: 'all 0.2s', fontSize: 14,
                        borderLeft: active === item.id ? '3px solid #f97316' : '3px solid transparent',
                        justifyContent: open ? 'flex-start' : 'center', width: '100%',
                    }}>
                        <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
                        {open && <span style={{ whiteSpace: 'nowrap' }}>{item.label}</span>}
                    </button>
                ))}
            </nav>
            <div style={{ padding: '12px 8px', borderTop: '1px solid var(--border)' }}>
                <button onClick={onLogout} style={{
                    display: 'flex', alignItems: 'center', gap: 11,
                    padding: open ? '11px 12px' : '11px', borderRadius: 10, border: 'none', cursor: 'pointer',
                    background: 'transparent', color: '#f87171', transition: 'all 0.2s', fontSize: 14,
                    width: '100%', justifyContent: open ? 'flex-start' : 'center',
                }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <span style={{ fontSize: 18 }}>🚪</span>
                    {open && 'Logout'}
                </button>
            </div>
        </aside>
    );
}

export default function TeacherDashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [active, setActive] = useState('dashboard');
    const [open, setOpen] = useState(true);
    const [newAnnouncement, setNewAnnouncement] = useState('');
    const [announcementTitle, setAnnouncementTitle] = useState('');
    const [announcements, setAnnouncements] = useState(ANNOUNCEMENTS_DATA);

    const handleLogout = () => { logout(); navigate('/'); };

    const postAnnouncement = () => {
        if (!announcementTitle.trim() || !newAnnouncement.trim()) return;
        setAnnouncements(prev => [{
            id: Date.now(), title: announcementTitle, body: newAnnouncement, time: 'Just now', color: '#f97316',
        }, ...prev]);
        setAnnouncementTitle(''); setNewAnnouncement('');
    };

    const stats = [
        { icon: '👥', label: 'Total Students', value: '84', accent: '#6c63ff', bg: 'rgba(108,99,255,0.12)' },
        { icon: '📚', label: 'Active Courses', value: '3', accent: '#f97316', bg: 'rgba(249,115,22,0.12)' },
        { icon: '📝', label: 'Pending Grading', value: '28', accent: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
        { icon: '⭐', label: 'Avg Class Score', value: '87%', accent: '#43e0c2', bg: 'rgba(67,224,194,0.12)' },
    ];

    return (
        <div style={{ display: 'flex', height: '100vh', background: 'var(--bg)', overflow: 'hidden' }}>
            <Sidebar active={active} setActive={setActive} open={open} setOpen={setOpen}
                userName={user?.name} onLogout={handleLogout} />

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                {/* Topbar */}
                <header style={{
                    height: 66, padding: '0 24px', borderBottom: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    background: 'rgba(15,15,26,0.85)', backdropFilter: 'blur(10px)',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <button onClick={() => setOpen(!open)} style={{
                            width: 34, height: 34, border: 'none', borderRadius: 8,
                            background: 'var(--bg-card)', cursor: 'pointer', color: 'var(--text-secondary)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18
                        }}>☰</button>
                        <div>
                            <h2 style={{ fontSize: 17, fontWeight: 700 }}>{NAV.find(n => n.id === active)?.label}</h2>
                            <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>Good day, {user?.name}!</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px',
                            background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10
                        }}>
                            <div style={{
                                width: 30, height: 30, borderRadius: '50%',
                                background: 'linear-gradient(135deg, #f97316, #43e0c2)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700
                            }}>
                                {user?.name?.[0]?.toUpperCase()}
                            </div>
                            <div>
                                <div style={{ fontSize: 13, fontWeight: 600 }}>{user?.name}</div>
                                <div style={{ fontSize: 11, color: '#fb923c' }}>Teacher</div>
                            </div>
                        </div>
                    </div>
                </header>

                <main style={{ flex: 1, overflow: 'auto', padding: '24px', animation: 'fadeSlideIn 0.4s ease' }}>

                    {/* DASHBOARD */}
                    {active === 'dashboard' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 14 }}>
                                {stats.map(s => (
                                    <div key={s.label} className="stat-card">
                                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: s.accent, borderRadius: '12px 12px 0 0' }} />
                                        <div style={{
                                            width: 44, height: 44, borderRadius: 12, background: s.bg,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 8
                                        }}>{s.icon}</div>
                                        <div className="stat-card-value" style={{ color: s.accent }}>{s.value}</div>
                                        <div className="stat-card-label">{s.label}</div>
                                    </div>
                                ))}
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 18 }}>
                                <div className="card">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                                        <h3 style={{ fontSize: 15, fontWeight: 700 }}>My Courses</h3>
                                        <button className="btn btn-ghost btn-sm" onClick={() => setActive('courses')}>Manage →</button>
                                    </div>
                                    {COURSES.map(c => (
                                        <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                                            <div style={{
                                                width: 40, height: 40, borderRadius: 10, background: `${c.color}22`,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0
                                            }}>{c.icon}</div>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                                                    <span style={{ fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</span>
                                                    <span style={{ fontSize: 12, color: 'var(--text-muted)', flexShrink: 0, marginLeft: 6 }}>👥 {c.students}</span>
                                                </div>
                                                <div className="progress-bar">
                                                    <div className="progress-fill" style={{ width: `${c.progress}%`, background: `linear-gradient(90deg,${c.color},${c.color}99)` }} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="card">
                                    <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 18 }}>Announcements</h3>
                                    {announcements.slice(0, 3).map((a, i) => (
                                        <div key={a.id} style={{ padding: '10px 0', borderBottom: i < 2 ? '1px solid var(--border-light)' : 'none' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: a.color, flexShrink: 0 }} />
                                                <p style={{ fontSize: 13, fontWeight: 600 }}>{a.title}</p>
                                            </div>
                                            <p style={{ fontSize: 11, color: 'var(--text-muted)', paddingLeft: 16 }}>{a.time}</p>
                                        </div>
                                    ))}
                                    <button className="btn btn-ghost btn-sm" style={{ marginTop: 10, width: '100%', justifyContent: 'center' }}
                                        onClick={() => setActive('announcements')}>View All →</button>
                                </div>
                            </div>

                            {/* Assignment summary */}
                            <div className="card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                                    <h3 style={{ fontSize: 15, fontWeight: 700 }}>Assignment Overview</h3>
                                    <button className="btn btn-ghost btn-sm" onClick={() => setActive('assignments')}>View All →</button>
                                </div>
                                {ASSIGNMENTS.map((a, i) => (
                                    <div key={a.id} style={{
                                        display: 'flex', alignItems: 'center', gap: 14, padding: '13px 0',
                                        borderBottom: i < ASSIGNMENTS.length - 1 ? '1px solid var(--border-light)' : 'none'
                                    }}>
                                        <div style={{
                                            width: 38, height: 38, borderRadius: 9, background: 'rgba(108,99,255,0.1)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 19, flexShrink: 0
                                        }}>📋</div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: 14, fontWeight: 600 }}>{a.title}</div>
                                            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{a.course} · Due {a.due}</div>
                                        </div>
                                        <div style={{ textAlign: 'right', marginRight: 8 }}>
                                            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>{a.submitted}/{a.total} submitted</div>
                                            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{a.graded} graded</div>
                                        </div>
                                        <button className="btn btn-primary btn-sm">Grade</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* COURSES */}
                    {active === 'courses' && (
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
                                <div>
                                    <h3 style={{ fontSize: 19, fontWeight: 700, marginBottom: 4 }}>Courses</h3>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Managing {COURSES.length} active courses.</p>
                                </div>
                                <button className="btn btn-primary btn-sm">+ New Course</button>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 18 }}>
                                {COURSES.map(c => (
                                    <div key={c.id} className="card" style={{ position: 'relative', overflow: 'hidden' }}>
                                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: c.color }} />
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, marginTop: 8 }}>
                                            <div style={{
                                                width: 46, height: 46, borderRadius: 12, background: `${c.color}22`,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24
                                            }}>{c.icon}</div>
                                            <div>
                                                <h4 style={{ fontSize: 14, fontWeight: 700 }}>{c.name}</h4>
                                                <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{c.schedule}</p>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
                                            <div style={{ flex: 1, background: 'var(--bg)', borderRadius: 8, padding: '8px 12px', textAlign: 'center' }}>
                                                <div style={{ fontSize: 18, fontWeight: 700, color: c.color }}>{c.students}</div>
                                                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Students</div>
                                            </div>
                                            <div style={{ flex: 1, background: 'var(--bg)', borderRadius: 8, padding: '8px 12px', textAlign: 'center' }}>
                                                <div style={{ fontSize: 18, fontWeight: 700, color: '#22c55e' }}>{c.progress}%</div>
                                                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Progress</div>
                                            </div>
                                        </div>
                                        <div className="progress-bar" style={{ marginBottom: 14 }}>
                                            <div className="progress-fill" style={{ width: `${c.progress}%`, background: `linear-gradient(90deg,${c.color},${c.color}88)` }} />
                                        </div>
                                        <div style={{ display: 'flex', gap: 8 }}>
                                            <button className="btn btn-primary btn-sm" style={{ flex: 1, justifyContent: 'center' }}>Manage</button>
                                            <button className="btn btn-outline btn-sm" style={{ flex: 1, justifyContent: 'center' }}>Grade</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* STUDENTS */}
                    {active === 'students' && (
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
                                <div>
                                    <h3 style={{ fontSize: 19, fontWeight: 700, marginBottom: 4 }}>Students</h3>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Showing all enrolled students.</p>
                                </div>
                                <button className="btn btn-primary btn-sm">+ Add Student</button>
                            </div>
                            <div className="card" style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                            {['Student', 'Email', 'Grade', 'Attendance', 'Status', 'Action'].map(h => (
                                                <th key={h} style={{
                                                    padding: '10px 14px', textAlign: 'left', fontSize: 12, fontWeight: 600,
                                                    color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.6px'
                                                }}>{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {STUDENTS.map((s, i) => (
                                            <tr key={s.id} style={{
                                                borderBottom: i < STUDENTS.length - 1 ? '1px solid var(--border-light)' : 'none',
                                                transition: 'background 0.2s'
                                            }}
                                                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                                <td style={{ padding: '14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                                                    <div style={{
                                                        width: 32, height: 32, borderRadius: '50%',
                                                        background: 'linear-gradient(135deg, #6c63ff, #43e0c2)',
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        fontSize: 13, fontWeight: 700, flexShrink: 0
                                                    }}>{s.name[0]}</div>
                                                    <span style={{ fontSize: 14, fontWeight: 600 }}>{s.name}</span>
                                                </td>
                                                <td style={{ padding: '14px', fontSize: 13, color: 'var(--text-secondary)' }}>{s.email}</td>
                                                <td style={{ padding: '14px' }}><span className="badge badge-primary">{s.grade}</span></td>
                                                <td style={{ padding: '14px', fontSize: 13, color: s.attendance < '85%' ? '#f87171' : 'var(--text-secondary)' }}>{s.attendance}</td>
                                                <td style={{ padding: '14px' }}>
                                                    <span className={`badge badge-${s.status === 'warning' ? 'warning' : 'success'}`}>
                                                        {s.status === 'warning' ? '⚠ At-risk' : '✓ Active'}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '14px' }}>
                                                    <button className="btn btn-ghost btn-sm">View Profile</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* ASSIGNMENTS */}
                    {active === 'assignments' && (
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
                                <div>
                                    <h3 style={{ fontSize: 19, fontWeight: 700, marginBottom: 4 }}>Assignments</h3>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Create and manage class assignments.</p>
                                </div>
                                <button className="btn btn-primary btn-sm">+ New Assignment</button>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                {ASSIGNMENTS.map(a => (
                                    <div key={a.id} className="card" style={{ flexDirection: 'row', alignItems: 'center', gap: 20, display: 'flex' }}>
                                        <div style={{
                                            width: 46, height: 46, borderRadius: 12, background: 'rgba(108,99,255,0.1)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0
                                        }}>📋</div>
                                        <div style={{ flex: 1 }}>
                                            <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{a.title}</h4>
                                            <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>{a.course} · Due {a.due}</p>
                                        </div>
                                        <div style={{ textAlign: 'center', minWidth: 80 }}>
                                            <div style={{ fontSize: 20, fontWeight: 800, color: '#43e0c2' }}>{a.submitted}/{a.total}</div>
                                            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Submitted</div>
                                        </div>
                                        <div style={{ textAlign: 'center', minWidth: 70 }}>
                                            <div style={{ fontSize: 20, fontWeight: 800, color: '#f97316' }}>{a.graded}</div>
                                            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Graded</div>
                                        </div>
                                        <div style={{ display: 'flex', gap: 8 }}>
                                            <button className="btn btn-primary btn-sm">Grade</button>
                                            <button className="btn btn-outline btn-sm">Edit</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* GRADES */}
                    {active === 'grades' && (
                        <div>
                            <h3 style={{ fontSize: 19, fontWeight: 700, marginBottom: 6 }}>Grade Book</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 22 }}>View and manage student grades.</p>
                            <div className="card" style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                            {['Student', 'Math III', 'Calculus', 'Statistics', 'Overall', 'Action'].map(h => (
                                                <th key={h} style={{
                                                    padding: '10px 14px', textAlign: 'left', fontSize: 12, fontWeight: 600,
                                                    color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.6px'
                                                }}>{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {STUDENTS.map((s, i) => {
                                            const overall = s.grade;
                                            return (
                                                <tr key={s.id} style={{ borderBottom: i < STUDENTS.length - 1 ? '1px solid var(--border-light)' : 'none' }}>
                                                    <td style={{ padding: '14px', fontSize: 14, fontWeight: 600 }}>{s.name}</td>
                                                    <td style={{ padding: '14px' }}><span className="badge badge-primary">{s.grade}</span></td>
                                                    <td style={{ padding: '14px' }}><span className="badge badge-info">B+</span></td>
                                                    <td style={{ padding: '14px' }}><span className="badge badge-success">A-</span></td>
                                                    <td style={{ padding: '14px', fontWeight: 700, color: '#43e0c2' }}>{overall}</td>
                                                    <td style={{ padding: '14px' }}><button className="btn btn-ghost btn-sm">Edit Grades</button></td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* ANNOUNCEMENTS */}
                    {active === 'announcements' && (
                        <div>
                            <h3 style={{ fontSize: 19, fontWeight: 700, marginBottom: 6 }}>Announcements</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 22 }}>Post updates for your students.</p>
                            <div className="card" style={{ marginBottom: 22 }}>
                                <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Create Announcement</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                                    <input className="form-input" type="text" placeholder="Title..."
                                        value={announcementTitle} onChange={e => setAnnouncementTitle(e.target.value)} />
                                    <textarea className="form-input" rows={3} placeholder="Write your announcement..."
                                        value={newAnnouncement} onChange={e => setNewAnnouncement(e.target.value)}
                                        style={{ resize: 'vertical', fontFamily: 'inherit' }} />
                                    <button className="btn btn-primary btn-sm" style={{ alignSelf: 'flex-start' }} onClick={postAnnouncement}>
                                        📢 Post Announcement
                                    </button>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                                {announcements.map(a => (
                                    <div key={a.id} className="card" style={{ borderLeft: `4px solid ${a.color}`, borderRadius: '0 12px 12px 0' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                                            <h4 style={{ fontSize: 15, fontWeight: 700 }}>{a.title}</h4>
                                            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{a.time}</span>
                                        </div>
                                        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{a.body}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* PROFILE */}
                    {active === 'profile' && (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', flexDirection: 'column', gap: 16 }}>
                            <div style={{
                                width: 80, height: 80, borderRadius: '50%',
                                background: 'linear-gradient(135deg, #f97316, #43e0c2)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, fontWeight: 700
                            }}>
                                {user?.name?.[0]?.toUpperCase()}
                            </div>
                            <h3 style={{ fontSize: 22, fontWeight: 700 }}>{user?.name}</h3>
                            <span className="badge badge-warning">Teacher</span>
                            <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{user?.email}</p>
                            <button className="btn btn-outline" style={{ marginTop: 8 }}>Edit Profile</button>
                            <button className="btn btn-danger btn-sm" style={{ marginTop: 4 }} onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
