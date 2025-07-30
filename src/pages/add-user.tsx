// pages/add-user.tsx
import { useState } from 'react';

export default function AddUser() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const res: Response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setMessage(data.message || 'User registered successfully!');
      setEmail('');
      setPassword('');
    } catch (err: any) {
      setError(err.message || 'Failed to register user');
    }
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f7f8',
        fontFamily: 'Segoe UI, sans-serif',
        padding: 20,
      }}
    >
      <div
        style={{
          background: '#ffffff',
          padding: '40px 30px',
          borderRadius: '16px',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: 20, color: '#2c3e50' }}>
          Register New User
        </h2>

        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold', color: '#34495e' }}>
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="example@domain.com"
            style={{
              width: '100%',
              padding: '10px 12px',
              marginBottom: 16,
              borderRadius: 8,
              border: '1px solid #ccc',
              fontSize: '1rem',
            }}
          />

          <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold', color: '#34495e' }}>
            Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter secure password"
            style={{
              width: '100%',
              padding: '10px 12px',
              marginBottom: 20,
              borderRadius: 8,
              border: '1px solid #ccc',
              fontSize: '1rem',
            }}
          />

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#3498db',
              color: '#fff',
              fontSize: '1rem',
              fontWeight: 'bold',
              borderRadius: 8,
              border: 'none',
              cursor: 'pointer',
              transition: 'background 0.3s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#2980b9')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#3498db')}
          >
            Register
          </button>
        </form>

        {message && (
          <p style={{ marginTop: 15, color: 'green', textAlign: 'center' }}>{message}</p>
        )}
        {error && (
          <p style={{ marginTop: 15, color: 'red', textAlign: 'center' }}>{error}</p>
        )}
      </div>
    </main>
  );
}
