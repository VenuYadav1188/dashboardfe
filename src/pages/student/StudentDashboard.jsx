import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../App.css';

const NAV = [
    { id: 'dashboard', icon: '🏠', label: 'Dashboard' },
    { id: 'courses', icon: '📚', label: 'My Courses' },
    { id: 'assignments', icon: '📝', label: 'Assignments' },
    { id: 'grades', icon: '📊', label: 'Grades' },
    { id: 'profile', icon: '👤', label: 'Profile' },
];

const COURSES = [
    { id: 1, name: 'Mathematics III', teacher: 'Dr. Smith', progress: 72, grade: 'A', color: '#6c63ff', icon: '📐' },
    { id: 2, name: 'Physics Fundamentals', teacher: 'Prof. Johnson', progress: 55, grade: 'B+', color: '#f97316', icon: '⚡' },
    { id: 3, name: 'Computer Science 101', teacher: 'Ms. Davis', progress: 88, grade: 'A+', color: '#43e0c2', icon: '💻' },
    { id: 4, name: 'English Literature', teacher: 'Mr. Wilson', progress: 40, grade: 'B', color: '#ff6584', icon: '📖' },
];

const ASSIGNMENTS = [
    { id: 1, title: 'Calculus Problem Set', course: 'Mathematics III', due: 'Mar 8', status: 'pending', priority: 'high' },
    { id: 2, title: "Lab Report: Newton's Laws", course: 'Physics Fundamentals', due: 'Mar 10', status: 'pending', priority: 'medium' },
    { id: 3, title: 'Binary Trees Essay', course: 'Computer Science 101', due: 'Mar 12', status: 'submitted', priority: 'low' },
    { id: 4, title: 'Shakespeare Analysis', course: 'English Literature', due: 'Mar 6', status: 'overdue', priority: 'high' },
];

const GRADES = [
    { subject: 'Mathematics III', score: 92, grade: 'A', change: '+4' },
    { subject: 'Physics Fundamentals', score: 84, grade: 'B+', change: '+1' },
    { subject: 'Computer Science 101', score: 97, grade: 'A+', change: '+6' },
    { subject: 'English Literature', score: 78, grade: 'B', change: '-2' },
];

const ANNOUNCEMENTS = [
    { id: 1, title: 'Mid-term Exams Schedule Released', time: '2 hours ago', color: '#6c63ff', icon: '📢' },
    { id: 2, title: 'Library extended hours this week', time: '1 day ago', color: '#43e0c2', icon: '📚' },
    { id: 3, title: 'Campus Wi-Fi maintenance on Friday', time: '2 days ago', color: '#f59e0b', icon: 'ℹ️' },
];

function Sidebar({ active, setActive, open, setOpen, userName, onLogout }) {
    return (
        <aside style={{
            width: open ? 240 : 68, minWidth: open ? 240 : 68,
            background: 'var(--bg-sidebar)', borderRight: '1px solid var(--border)',
            display: 'flex', flexDirection: 'column', transition: 'width 0.3s ease, min-width 0.3s ease',
            overflow: 'hidden',
        }}>
            <div style={{
                padding: open ? '22px 18px' : '22px 14px', borderBottom: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', gap: 12
            }}>
                <div style={{
                    width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                    background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, fontWeight: 900
                }}>E</div>
                {open && <span style={{ fontSize: 17, fontWeight: 800, whiteSpace: 'nowrap' }}>Edu<span style={{ color: 'var(--primary)' }}>Hub</span></span>}
            </div>
            <nav style={{ flex: 1, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: 3 }}>
                {NAV.map(item => (
                    <button key={item.id} onClick={() => setActive(item.id)} style={{
                        display: 'flex', alignItems: 'center', gap: 11,
                        padding: open ? '11px 12px' : '11px', borderRadius: 10, border: 'none', cursor: 'pointer',
                        background: active === item.id ? 'rgba(108,99,255,0.15)' : 'transparent',
                        color: active === item.id ? 'var(--primary-light)' : 'var(--text-secondary)',
                        fontWeight: active === item.id ? 600 : 400, transition: 'all 0.2s', fontSize: 14,
                        borderLeft: active === item.id ? '3px solid var(--primary)' : '3px solid transparent',
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
                    background: 'transparent', color: '#f87171', transition: 'all 0.2s',
                    fontSize: 14, width: '100%', justifyContent: open ? 'flex-start' : 'center',
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

function StatCard({ icon, label, value, accent, bg }) {
    return (
        <div className="stat-card">
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: accent, borderRadius: '12px 12px 0 0' }} />
            <div style={{
                width: 44, height: 44, borderRadius: 12, background: bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 8
            }}>{icon}</div>
            <div className="stat-card-value" style={{ color: accent }}>{value}</div>
            <div className="stat-card-label">{label}</div>
        </div>
    );
}

export default function StudentDashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [active, setActive] = useState('dashboard');
    const [open, setOpen] = useState(true);

    const handleLogout = () => { logout(); navigate('/'); };

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
                            <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>Welcome back, {user?.name}!</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px',
                            background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10
                        }}>
                            <div style={{
                                width: 30, height: 30, borderRadius: '50%',
                                background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700
                            }}>
                                {user?.name?.[0]?.toUpperCase()}
                            </div>
                            <div>
                                <div style={{ fontSize: 13, fontWeight: 600 }}>{user?.name}</div>
                                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Student</div>
                            </div>
                        </div>
                    </div>
                </header>

                <main style={{ flex: 1, overflow: 'auto', padding: '24px', animation: 'fadeSlideIn 0.4s ease' }}>

                    {/* DASHBOARD */}
                    {active === 'dashboard' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 14 }}>
                                <StatCard icon="📚" label="Enrolled Courses" value="4" accent="#6c63ff" bg="rgba(108,99,255,0.12)" />
                                <StatCard icon="📝" label="Assignments Due" value="3" accent="#f97316" bg="rgba(249,115,22,0.12)" />
                                <StatCard icon="⭐" label="Average Grade" value="A-" accent="#43e0c2" bg="rgba(67,224,194,0.12)" />
                                <StatCard icon="✅" label="Attendance" value="94%" accent="#22c55e" bg="rgba(34,197,94,0.12)" />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 18 }}>
                                <div className="card">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                                        <h3 style={{ fontSize: 15, fontWeight: 700 }}>Active Courses</h3>
                                        <button className="btn btn-ghost btn-sm" onClick={() => setActive('courses')}>View All →</button>
                                    </div>
                                    {COURSES.map(c => (
                                        <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                                            <div style={{
                                                width: 38, height: 38, borderRadius: 10, background: `${c.color}22`,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 19, flexShrink: 0
                                            }}>{c.icon}</div>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                                                    <span style={{ fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</span>
                                                    <span style={{ fontSize: 12, color: c.color, fontWeight: 700, marginLeft: 6, flexShrink: 0 }}>{c.progress}%</span>
                                                </div>
                                                <div className="progress-bar">
                                                    <div className="progress-fill" style={{ width: `${c.progress}%`, background: `linear-gradient(90deg,${c.color},${c.color}99)` }} />
                                                </div>
                                            </div>
                                            <span className="badge badge-primary" style={{ flexShrink: 0 }}>{c.grade}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="card">
                                    <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 18 }}>Announcements</h3>
                                    {ANNOUNCEMENTS.map((a, i) => (
                                        <div key={a.id} style={{
                                            display: 'flex', gap: 10, padding: '10px 0',
                                            borderBottom: i < ANNOUNCEMENTS.length - 1 ? '1px solid var(--border-light)' : 'none'
                                        }}>
                                            <div style={{
                                                width: 34, height: 34, borderRadius: 9, background: `${a.color}22`,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0
                                            }}>{a.icon}</div>
                                            <div>
                                                <p style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.4 }}>{a.title}</p>
                                                <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 3 }}>{a.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                                    <h3 style={{ fontSize: 15, fontWeight: 700 }}>Upcoming Assignments</h3>
                                    <button className="btn btn-ghost btn-sm" onClick={() => setActive('assignments')}>View All →</button>
                                </div>
                                {ASSIGNMENTS.map((a, i) => (
                                    <div key={a.id} style={{
                                        display: 'flex', alignItems: 'center', gap: 14, padding: '13px 0',
                                        borderBottom: i < ASSIGNMENTS.length - 1 ? '1px solid var(--border-light)' : 'none'
                                    }}>
                                        <div style={{
                                            width: 36, height: 36, borderRadius: 9,
                                            background: a.status === 'overdue' ? 'rgba(239,68,68,0.1)' : a.status === 'submitted' ? 'rgba(34,197,94,0.1)' : 'rgba(108,99,255,0.1)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0
                                        }}>
                                            {a.status === 'submitted' ? '✅' : a.status === 'overdue' ? '⚠️' : '📝'}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: 14, fontWeight: 600 }}>{a.title}</div>
                                            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{a.course}</div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontSize: 12, fontWeight: 600, color: a.status === 'overdue' ? '#f87171' : 'var(--text-secondary)' }}>Due {a.due}</div>
                                            <span className={`badge badge-${a.status === 'submitted' ? 'success' : a.status === 'overdue' ? 'error' : 'warning'}`} style={{ marginTop: 4, fontSize: 10 }}>
                                                {a.status === 'submitted' ? '✓ Submitted' : a.status === 'overdue' ? 'Overdue' : a.priority + ' priority'}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* COURSES */}
                    {active === 'courses' && (
                        <div>
                            <h3 style={{ fontSize: 19, fontWeight: 700, marginBottom: 6 }}>My Courses</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 22 }}>Enrolled in {COURSES.length} courses this semester.</p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(270px,1fr))', gap: 18 }}>
                                {COURSES.map(c => (
                                    <div key={c.id} className="card" style={{ cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>
                                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: c.color }} />
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14, marginTop: 8 }}>
                                            <div style={{
                                                width: 46, height: 46, borderRadius: 12, background: `${c.color}22`,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24
                                            }}>{c.icon}</div>
                                            <div>
                                                <h4 style={{ fontSize: 14, fontWeight: 700 }}>{c.name}</h4>
                                                <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{c.teacher}</p>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7, fontSize: 12 }}>
                                            <span style={{ color: 'var(--text-secondary)' }}>Progress</span>
                                            <span style={{ fontWeight: 600, color: c.color }}>{c.progress}%</span>
                                        </div>
                                        <div className="progress-bar" style={{ marginBottom: 14 }}>
                                            <div className="progress-fill" style={{ width: `${c.progress}%`, background: `linear-gradient(90deg,${c.color},${c.color}88)` }} />
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span className="badge badge-primary">Grade: {c.grade}</span>
                                            <button className="btn btn-ghost btn-sm" style={{ fontSize: 12 }}>View →</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ASSIGNMENTS */}
                    {active === 'assignments' && (
                        <div>
                            <h3 style={{ fontSize: 19, fontWeight: 700, marginBottom: 6 }}>Assignments</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 22 }}>Track and manage all your assignments.</p>
                            <div className="card">
                                {ASSIGNMENTS.map((a, i) => (
                                    <div key={a.id} style={{
                                        display: 'flex', alignItems: 'center', gap: 14, padding: '15px 0',
                                        borderBottom: i < ASSIGNMENTS.length - 1 ? '1px solid var(--border-light)' : 'none'
                                    }}>
                                        <div style={{
                                            width: 38, height: 38, borderRadius: 10,
                                            background: a.status === 'overdue' ? 'rgba(239,68,68,0.1)' : a.status === 'submitted' ? 'rgba(34,197,94,0.1)' : 'rgba(108,99,255,0.1)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 19, flexShrink: 0
                                        }}>
                                            {a.status === 'submitted' ? '✅' : a.status === 'overdue' ? '⚠️' : '📝'}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: 14, fontWeight: 600 }}>{a.title}</div>
                                            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{a.course}</div>
                                        </div>
                                        <div style={{ textAlign: 'right', marginRight: 8 }}>
                                            <div style={{ fontSize: 12, fontWeight: 500, color: a.status === 'overdue' ? '#f87171' : 'var(--text-secondary)' }}>Due {a.due}</div>
                                        </div>
                                        <span className={`badge badge-${a.status === 'submitted' ? 'success' : a.status === 'overdue' ? 'error' : 'warning'}`}>
                                            {a.status === 'submitted' ? '✓ Submitted' : a.status === 'overdue' ? 'Overdue' : a.priority + ' priority'}
                                        </span>
                                        {a.status === 'pending' && <button className="btn btn-primary btn-sm" style={{ flexShrink: 0 }}>Submit</button>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* GRADES */}
                    {active === 'grades' && (
                        <div>
                            <h3 style={{ fontSize: 19, fontWeight: 700, marginBottom: 6 }}>My Grades</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 22 }}>Academic performance this semester.</p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 14, marginBottom: 22 }}>
                                {GRADES.map(g => (
                                    <div key={g.subject} className="stat-card">
                                        <div style={{
                                            position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                                            background: g.change.startsWith('+') ? '#22c55e' : '#ef4444', borderRadius: '12px 12px 0 0'
                                        }} />
                                        <div className="stat-card-value">{g.grade}</div>
                                        <div className="stat-card-label">{g.subject}</div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                                            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Score: {g.score}/100</span>
                                            <span style={{ fontSize: 12, fontWeight: 600, color: g.change.startsWith('+') ? '#4ade80' : '#f87171' }}>{g.change}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="card">
                                <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 18 }}>Detailed Breakdown</h4>
                                {GRADES.map(g => (
                                    <div key={g.subject} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                                        <div style={{ width: 110, fontSize: 12, color: 'var(--text-secondary)', flexShrink: 0 }}>{g.subject.split(' ')[0]}</div>
                                        <div style={{ flex: 1 }}><div className="progress-bar"><div className="progress-fill" style={{ width: `${g.score}%` }} /></div></div>
                                        <div style={{ width: 38, fontSize: 13, fontWeight: 700, textAlign: 'right' }}>{g.score}%</div>
                                        <span className="badge badge-primary" style={{ width: 34, justifyContent: 'center' }}>{g.grade}</span>
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
                                background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, fontWeight: 700
                            }}>
                                {user?.name?.[0]?.toUpperCase()}
                            </div>
                            <h3 style={{ fontSize: 22, fontWeight: 700 }}>{user?.name}</h3>
                            <span className="badge badge-primary">Student</span>
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
