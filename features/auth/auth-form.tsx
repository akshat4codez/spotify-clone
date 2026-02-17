'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api-client';
import toast from 'react-hot-toast';

export function AuthForm({ mode }: { mode: 'login' | 'signup' }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const router = useRouter();

  const submit = async () => {
    try {
      const endpoint = mode === 'login' ? '/auth/login' : '/auth/signup';
      const payload = mode === 'login' ? { email, password } : { email, password, name };
      const { data } = await api.post(endpoint, payload);
      localStorage.setItem('token', data.token);
      toast.success('Welcome back');
      router.push('/');
    } catch {
      toast.error('Authentication failed');
    }
  };

  return (
    <div className="w-full max-w-md card-glass rounded-xl p-6 space-y-4">
      <h1 className="text-2xl font-bold">{mode === 'login' ? 'Log in' : 'Sign up'}</h1>
      {mode === 'signup' && <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />}
      <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={submit} className="w-full">{mode === 'login' ? 'Login' : 'Create account'}</Button>
    </div>
  );
}
