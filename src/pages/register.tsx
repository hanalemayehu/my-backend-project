import { useState } from 'react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    setMessage(data.message || 'Something went wrong');
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: '50px auto',
        padding: 30,
        backgroundColor: '#f9f9f9',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: 20, color: '#333' }}>Create an Account</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email" style={{ fontWeight: 'bold', color: '#333' }}>
          Email
        </label>
       <input
  id="email"
  type="email"
  placeholder="example@email.com"
  value={email}
  onChange={e => setEmail(e.target.value)}
  required
  style={{
    width: '100%',
    padding: 10,
    marginBottom: 16,
    marginTop: 4,
    borderRadius: 6,
    border: '1px solid #aaa',          // Slightly darker border
    fontSize: 14,
    color: '#111',                      // Darker text
    backgroundColor: '#fff',           // Clear white background
  }}
/>

        <label htmlFor="password" style={{ fontWeight: 'bold', color: '#333' }}>
          Password
        </label>
        <input
  id="password"
  type="password"
  placeholder="Enter your password"
  value={password}
  onChange={e => setPassword(e.target.value)}
  required
  style={{
    width: '100%',
    padding: 10,
    marginBottom: 20,
    marginTop: 4,
    borderRadius: 6,
    border: '1px solid #aaa',
    fontSize: 14,
    color: '#111',
    backgroundColor: '#fff',
  }}
/>
        <button
          type="submit"
          style={{
            width: '100%',
            padding: 12,
            backgroundColor: '#0070f3',
            color: '#fff',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            fontSize: 16,
          }}
        >
          Register
        </button>
      </form>

      {message && (
        <p
          style={{
            marginTop: 20,
            textAlign: 'center',
            color: message.includes('success') ? 'green' : 'red',
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}
