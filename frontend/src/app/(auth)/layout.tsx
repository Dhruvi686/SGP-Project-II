'use client';

import React from 'react';
import { AuthProvider } from '@/lib/Authcontextapi';

export default function AuthGroupLayout({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}


