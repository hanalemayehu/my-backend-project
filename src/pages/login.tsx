import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<{ message: string; token: string }>('/api/auth/login', {
        email,
        password,
      });

      const token = response.data.token;
      localStorage.setItem('token', token);

      console.log("Saved token:", token);
      router.push('/dashboard');
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Login failed';
      console.error('Login failed:', errorMsg);
      setMessage(errorMsg);
    }
  };

  return (
    <div style={{
      maxWidth: 400,
      margin: 'auto',
      padding: 20,
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: 20 }}>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '12px',
            fontSize: '16px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            backgroundColor: '#fff',
            color: '#000',
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '12px',
            fontSize: '16px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            backgroundColor: '#fff',
            color: '#000',
          }}
        />
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '6px',
            backgroundColor: '#0070f3',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Login
        </button>
      </form>
      {message && (
        <p style={{
          marginTop: '16px',
          color: 'red',
          textAlign: 'center',
        }}>
          {message}
        </p>
      )}
    </div>
  );
}
