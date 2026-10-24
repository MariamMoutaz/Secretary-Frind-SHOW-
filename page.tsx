'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../context/UserContext';

export default function RootPage() {
  const { user } = useUser();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // 1. إذا لم يكن مسجل دخول
    if (!user?.isLoggedIn) {
      router.replace('/auth/login');
    } 
    // 2. إذا كان مسجل دخول لكن لم يكمل الـ onboarding بعد
    else if (!user?.onboarded) {
      router.replace('/auth/onboarding');
    } 
    // 3. إذا كان حسابه جاهزاً، التوجيه للرئيسية فوراً
    else {
      router.replace('/home');
    }
  }, [user, mounted, router]);

  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#030805' }}>
      <div style={{ color: '#4ade80', fontFamily: 'monospace', fontSize: '1.2rem', fontWeight: 700 }}>
        Loading Secretary Friend...
      </div>
    </div>
  );
}