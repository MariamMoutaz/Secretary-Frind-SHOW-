'use client';

import './globals.css';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { UserProvider, useUser } from '../context/UserContext';
import {
  Home as HomeIcon, Target, CheckSquare, BookOpen, Brain, 
  Users, Gamepad2, Calendar as CalendarIcon, BookMarked, Trophy, Search, 
  Moon, Sun, Bell, LogOut, Languages, Leaf, Bot, MapPin, User
} from 'lucide-react';

function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { 
    user, tasks = [], xp, level, notifications = [], 
    clearNotifications, logout, theme, toggleTheme, language, setLanguage 
  } = useUser() as any;

  const [liveDate, setLiveDate] = useState('');
  const [liveTime, setLiveTime] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const isAuthPage = pathname?.startsWith('/auth');
  const isLight = theme === 'light';
  const isAr = language === 'ar';

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setLiveDate(now.toLocaleDateString(isAr ? 'ar-EG' : 'en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }));
      setLiveTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [isAr]);

  if (isAuthPage) return <>{children}</>;

  const activeCount = tasks.filter((t: any) => !t.completed).length;
  const displayName = user?.name?.trim() ? user.name : 'Mariam Moutaz';
  const progressRatio = Math.min(1, ((xp || 0) % 500) / 500);

  const t = {
    bg: isLight ? '#f2f5ee' : '#040d06',
    sidebarBg: isLight ? '#ffffff' : '#020703',
    panel: isLight ? '#ffffff' : 'rgba(4, 16, 8, 0.85)',
    border: isLight ? '#e1e7dc' : 'rgba(74, 222, 128, 0.15)',
    borderGlowing: isLight ? 'rgba(27, 67, 50, 0.25)' : 'rgba(74, 222, 128, 0.45)',
    textMain: isLight ? '#163323' : '#f8fafc',
    textMuted: isLight ? '#5e7367' : '#94a3b8',
    primaryGreen: isLight ? '#1b4332' : '#22c55e',
    lightGreen: isLight ? 'rgba(27, 67, 50, 0.08)' : 'rgba(34, 197, 94, 0.16)',
  };

  const navItems = [
    { id: 'Home', label: isAr ? 'الرئيسية' : 'Home', icon: <HomeIcon size={18} />, href: '/home' },
    { id: 'Focus Chamber', label: isAr ? 'غرفة التركيز' : 'Focus Chamber', icon: <Target size={18} />, href: '/focus' },
    { id: 'Tasks & Quests', label: isAr ? 'المهام والتحديات' : 'Tasks & Quests', icon: <CheckSquare size={18} />, href: '/tasks', badge: activeCount },
    { id: 'Subjects', label: isAr ? 'المواد الدراسية' : 'Subjects', icon: <BookOpen size={18} />, href: '/subjects' },
    { id: 'AI Assistant', label: isAr ? 'المساعد الذكي' : 'AI Assistant', icon: <Brain size={18} />, href: '/ai-assistant' },
    { id: 'RAG Study Assistant', label: 'RAG Assistant', icon: <Bot size={18} />, href: '/rag-assistant' },
    { id: 'Study Hub', label: 'Study Hub', icon: <Users size={18} />, href: '/study-hub' },
    { id: 'Roadmap', label: isAr ? 'خريطة الطريق' : 'Roadmap', icon: <MapPin size={18} />, href: '/roadmap' },
    { id: 'Brain Games', label: isAr ? 'ألعاب الذاكرة' : 'Brain Games', icon: <Gamepad2 size={18} />, href: '/brain-games' },
    { id: 'Schedule', label: isAr ? 'الجدول' : 'Schedule', icon: <CalendarIcon size={18} />, href: '/schedule' },
    { id: 'Notebook', label: isAr ? 'دفتر الملاحظات' : 'Notebook', icon: <BookMarked size={18} />, href: '/notebook' },
    { id: 'Leaderboard', label: isAr ? 'لوحة الشرف' : 'Leaderboard', icon: <Trophy size={18} />, href: '/leaderboard' },
    { id: 'Profile & Settings', label: isAr ? 'الملف الشخصي' : 'Profile & Settings', icon: <User size={18} />, href: '/profile' },
  ];

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      background: t.bg,
      color: t.textMain,
      display: 'flex',
      direction: isAr ? 'rtl' : 'ltr',
      overflow: 'hidden',
      transition: 'background-color 0.25s ease, color 0.25s ease'
    }}>
      
      {/* 1. السايدبار الموحد */}
      <aside style={{
        width: '235px',
        height: '100vh',
        background: t.sidebarBg,
        borderRight: isAr ? 'none' : `1px solid ${t.border}`,
        borderLeft: isAr ? `1px solid ${t.border}` : 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '16px 12px',
        flexShrink: 0,
        zIndex: 30,
        transition: 'background-color 0.25s ease, border-color 0.25s ease'
      }}>
        <div style={{ overflowY: 'auto' }}>
          <Link href="/home" style={{ textDecoration: 'none', display: 'block', padding: '0 8px 14px' }}>
            <h1 style={{ fontSize: '1.45rem', fontWeight: 900, margin: 0, color: t.textMain, lineHeight: 1 }}>Secretary</h1>
            <div style={{ fontSize: '1.45rem', fontWeight: 900, background: 'linear-gradient(90deg, #f97316 0%, #fb923c 45%, #4ade80 85%, #22c55e 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>Friend</div>
            <p style={{ margin: '4px 0 0', fontSize: '0.58rem', color: t.textMuted, letterSpacing: '0.8px', textTransform: 'uppercase' }}>Study Smarter • Grow Faster</p>
          </Link>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            {navItems.map((item) => {
              const isSelected = item.href !== '#' && pathname === item.href;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: '12px',
                    background: isSelected ? t.lightGreen : 'transparent',
                    border: `1.2px solid ${isSelected ? t.primaryGreen : 'transparent'}`,
                    boxShadow: isSelected ? (isLight ? '0 2px 8px rgba(0,0,0,0.04)' : '0 0 12px rgba(34, 197, 94, 0.25)') : 'none',
                    color: isSelected ? t.primaryGreen : t.textMuted,
                    textDecoration: 'none',
                    fontSize: '0.76rem',
                    fontWeight: isSelected ? 800 : 600,
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span style={{ background: '#ef4444', color: '#fff', fontSize: '0.62rem', padding: '1px 6px', borderRadius: '99px', fontWeight: 800 }}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '8px', borderTop: `1px solid ${t.border}` }}>
          <div style={{ background: isLight ? '#f7faf4' : 'rgba(6, 20, 10, 0.75)', border: `1px solid ${t.border}`, borderRadius: '12px', padding: '8px 10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1rem' }}>🌱</span>
            <div>
              <div style={{ fontSize: '0.66rem', fontWeight: 800, color: t.primaryGreen }}>Small steps every day</div>
              <div style={{ fontSize: '0.58rem', color: t.textMuted }}>build big dreams.</div>
            </div>
          </div>

          <div style={{ background: isLight ? '#f7faf4' : 'rgba(6, 18, 10, 0.85)', border: `1px solid ${t.border}`, borderRadius: '14px', padding: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: t.primaryGreen, color: isLight ? '#fff' : '#022c22', display: 'grid', placeItems: 'center', fontWeight: 900, fontSize: '0.75rem' }}>
                {displayName[0]?.toUpperCase() || 'M'}
              </div>
              <div>
                <div style={{ fontSize: '0.74rem', fontWeight: 800, color: t.textMain }}>{displayName}</div>
                <div style={{ fontSize: '0.58rem', color: t.primaryGreen }}>Level {level || 1} • Scholar</div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.58rem', color: t.textMuted, marginBottom: '2px' }}>
                <span>{xp || 0} XP</span>
                <span>{Math.round(progressRatio * 100)}%</span>
              </div>
              <div style={{ width: '100%', height: '3.5px', background: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)', borderRadius: '99px' }}>
                <div style={{ width: `${progressRatio * 100}%`, height: '100%', background: t.primaryGreen, borderRadius: '99px' }} />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', paddingTop: '6px', borderTop: `1px solid ${t.border}` }}>
              <button type="button" onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')} title="Toggle Language" style={{ background: 'transparent', border: 'none', color: t.textMuted, cursor: 'pointer', padding: 0 }}>
                <Languages size={15} />
              </button>
              <button type="button" onClick={toggleTheme} title="Toggle Theme" style={{ background: 'transparent', border: 'none', color: isLight ? '#f59e0b' : '#4ade80', cursor: 'pointer', padding: 0 }}>
                {isLight ? <Sun size={15} /> : <Moon size={15} />}
              </button>
              <button type="button" onClick={() => { logout(); router.push('/auth/login'); }} title="Log Out" style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: 0 }}>
                <LogOut size={15} />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. منطقة العمل والهيدر الموحد */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflowY: 'auto', overflowX: 'hidden' }}>
        
        <header style={{
          height: '56px',
          borderBottom: `1px solid ${t.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
          background: isLight ? '#ffffff' : 'rgba(2, 8, 3, 0.75)',
          backdropFilter: 'blur(20px)',
          position: 'sticky',
          top: 0,
          zIndex: 40,
          flexShrink: 0,
          transition: 'background-color 0.25s ease, border-color 0.25s ease'
        }}>
          {/* شريط البحث */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: isLight ? '#f7faf4' : 'rgba(4, 16, 8, 0.85)',
            border: `1px solid ${t.border}`,
            borderRadius: '10px',
            padding: '6px 12px',
            width: '280px'
          }}>
            <Search size={14} color={t.textMuted} />
            <input
              type="text"
              placeholder={isAr ? 'البحث عن المهام، المواد...' : 'Search tasks, subjects, or anything...'}
              style={{ background: 'transparent', border: 'none', outline: 'none', color: t.textMain, fontSize: '0.72rem', width: '100%' }}
            />
            <span style={{ fontSize: '0.58rem', color: t.textMuted, background: isLight ? '#ffffff' : 'rgba(255,255,255,0.06)', padding: '2px 5px', borderRadius: '4px', border: `1px solid ${t.border}` }}>
              Ctrl + K
            </span>
          </div>

          {/* الأزرار التفاعلية العلوية */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            
            {/* تبديل الثيم الفعال المربوط بالـ Context */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: isLight ? '#f7faf4' : 'rgba(255,255,255,0.04)', border: `1px solid ${t.border}`, borderRadius: '99px', padding: '2px 6px' }}>
              <button 
                type="button" 
                onClick={toggleTheme} 
                title="Light Mode"
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '3px', color: isLight ? '#f59e0b' : t.textMuted, display: 'grid', placeItems: 'center' }}
              >
                <Sun size={15} />
              </button>
              <button 
                type="button" 
                onClick={toggleTheme} 
                title="Dark Mode"
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '3px', color: !isLight ? '#4ade80' : t.textMuted, display: 'grid', placeItems: 'center' }}
              >
                <Moon size={15} />
              </button>
            </div>

            {/* تبديل اللغة */}
            <button
              type="button"
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              title="Toggle Language"
              style={{
                background: isLight ? '#f7faf4' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${t.border}`,
                borderRadius: '99px',
                padding: '4px 10px',
                color: t.textMain,
                fontSize: '0.7rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <Languages size={13} color={t.textMuted} />
              <span>{isAr ? 'العربية' : 'EN'}</span>
            </button>

            {/* جرس الإشعارات */}
            <div style={{ position: 'relative' }}>
              <button type="button" onClick={() => setShowNotifications(!showNotifications)} style={{ background: 'transparent', border: 'none', color: t.textMain, cursor: 'pointer', position: 'relative', display: 'grid', placeItems: 'center' }}>
                <Bell size={16} />
                {notifications.length > 0 && (
                  <span style={{ position: 'absolute', top: -4, right: -4, background: '#ef4444', color: '#fff', borderRadius: '50%', width: '14px', height: '14px', fontSize: '0.55rem', display: 'grid', placeItems: 'center', fontWeight: 900 }}>
                    {notifications.length}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div style={{
                  position: 'absolute', top: '36px', [isAr ? 'left' : 'right']: 0, width: '280px',
                  background: isLight ? '#ffffff' : '#06160b', border: `1px solid ${t.borderGlowing}`,
                  borderRadius: '14px', padding: '14px', boxShadow: '0 10px 30px rgba(0,0,0,0.15)', zIndex: 100
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', paddingBottom: '6px', borderBottom: `1px solid ${t.border}` }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: t.textMain }}>{isAr ? 'الإشعارات' : 'Notifications'}</span>
                    <button type="button" onClick={() => clearNotifications()} style={{ background: 'transparent', border: 'none', fontSize: '0.66rem', color: '#ef4444', cursor: 'pointer', fontWeight: 700 }}>
                      {isAr ? 'مسح الكل' : 'Clear All'}
                    </button>
                  </div>
                  {notifications.length === 0 ? (
                    <div style={{ fontSize: '0.72rem', color: t.textMuted, textAlign: 'center', padding: '10px 0' }}>
                      {isAr ? 'لا توجد إشعارات حالياً.' : 'No notifications.'}
                    </div>
                  ) : (
                    notifications.map((n: any) => (
                      <div key={n.id} style={{ padding: '6px 8px', borderRadius: '6px', background: isLight ? '#f7faf4' : 'rgba(255,255,255,0.03)', fontSize: '0.7rem', marginBottom: '6px', color: t.textMain }}>
                        {isAr ? n.textAr : n.textEn}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* الوقت والتاريخ */}
            <div style={{ fontSize: '0.66rem', color: t.textMuted, borderLeft: `1px solid ${t.border}`, borderRight: `1px solid ${t.border}`, padding: '0 10px', fontWeight: 600, textAlign: 'center' }}>
              <div>{liveDate}</div>
              <div style={{ fontSize: '0.76rem', fontWeight: 800, color: t.textMain }}>{liveTime}</div>
            </div>

            {/* بروفايل المستخدم المصغر */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: t.primaryGreen, color: isLight ? '#fff' : '#022c22', display: 'grid', placeItems: 'center', fontWeight: 900, fontSize: '0.75rem' }}>
                {displayName[0]?.toUpperCase() || 'M'}
              </div>
              <div>
                <div style={{ fontSize: '0.74rem', fontWeight: 800, lineHeight: 1.1, color: t.textMain }}>{displayName}</div>
                <div style={{ fontSize: '0.58rem', color: t.primaryGreen }}>Level {level || 1} • Scholar</div>
              </div>
            </div>

            {/* شارة التحفيز */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: isLight ? 'rgba(27, 67, 50, 0.08)' : 'rgba(34, 197, 94, 0.1)', border: `1px solid ${t.border}`, borderRadius: '99px', padding: '3px 10px' }}>
              <Leaf size={14} color={isLight ? '#1b4332' : '#4ade80'} />
              <div>
                <div style={{ fontSize: '0.6rem', fontWeight: 800, color: t.primaryGreen, lineHeight: 1 }}>Discipline today,</div>
                <div style={{ fontSize: '0.52rem', color: t.textMuted }}>freedom tomorrow.</div>
              </div>
            </div>
          </div>
        </header>

        <main style={{ flex: 1, width: '100%', background: t.bg }}>
          {children}
        </main>
      </div>

    </div>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <UserProvider>
          <Shell>{children}</Shell>
        </UserProvider>
      </body>
    </html>
  );
}