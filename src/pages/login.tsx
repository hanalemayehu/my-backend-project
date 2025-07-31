// pages/login.tsx (React + Next.js + Axios)
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post<{ message: string; token: string }>('/api/auth/login', {
  email,
  password,
});


      // ✅ Save token to localStorage
      const token = response.data.token;
      localStorage.setItem('token', token);

      // ✅ Log to verify it's saved
      console.log("Saved token:", localStorage.getItem('token'));

      // Optionally navigate
      router.push('/dashboard'); // or any other protected route
    } catch (err: any) {
      const message = err.response?.data?.message || 'Unexpected error occurred';
console.error('Login failed:', message);
alert('Login failed: ' + message);

    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      /><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      /><br />
      <button type="submit">Login</button>
    </form>
  );
}
