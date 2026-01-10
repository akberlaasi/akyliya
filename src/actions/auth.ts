'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  const password = formData.get('password');
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminSecret = process.env.ADMIN_SECRET_TOKEN;

  if (password === adminPassword) {
    // Set a cookie to maintain the session
    const cookieStore = await cookies();
    cookieStore.set('admin_session', adminSecret!, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });
    
    redirect('/admin');
  } else {
    // In a real app, you'd return an error to display on the form
    // For simplicity here, we'll just reload/redirect to login
    redirect('/login?error=Invalid password');
  }
}
