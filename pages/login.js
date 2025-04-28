import React from 'react';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();
  const [form, setForm] = React.useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [session]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    // Simulate saving to Contentful (replace with real API call)
    setTimeout(() => {
      setLoading(false);
      alert('Registered! (Simulated, should save to Contentful)');
      router.push('/');
    }, 1500);
  };

  const handleGoogle = () => {
    signIn('google');
  };

  return (
    <div style={{maxWidth:400,margin:'3.5rem auto',padding:'2.5rem',background:'rgba(255,255,255,0.85)',borderRadius:18,boxShadow:'0 6px 32px 0 rgba(31,38,135,0.13)',display:'flex',flexDirection:'column',alignItems:'center'}}>
      <h2 style={{textAlign:'center',marginBottom:'1.2em',color:'#2563eb',fontWeight:800,letterSpacing:'0.02em'}}>Login or Register</h2>
      <button onClick={handleGoogle} style={{width:'100%',padding:'0.8em',marginBottom:'1.1em',background:'#4285F4',color:'#fff',border:'none',borderRadius:8,fontWeight:600,fontSize:'1.08em',cursor:'pointer',boxShadow:'0 2px 8px #2563eb22',transition:'background 0.2s'}}>
        <span style={{display:'inline-flex',alignItems:'center',gap:'0.7em'}}>
          <svg width="20" height="20" viewBox="0 0 48 48" style={{marginRight:6}}><g><path fill="#4285F4" d="M43.611 20.083h-1.861V20H24v8h11.303c-1.627 4.657-6.084 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c2.834 0 5.428 1 7.484 2.649l6.324-6.324C34.014 5.527 29.284 3.5 24 3.5 12.849 3.5 3.5 12.849 3.5 24S12.849 44.5 24 44.5c10.45 0 19.5-8.5 19.5-19.5 0-1.305-.138-2.574-.389-3.833z"/><path fill="#34A853" d="M6.306 14.691l6.571 4.819C14.655 16.108 19.009 13.5 24 13.5c2.834 0 5.428 1 7.484 2.649l6.324-6.324C34.014 5.527 29.284 3.5 24 3.5c-7.137 0-13.286 4.1-16.194 10.191z"/><path fill="#FBBC05" d="M24 44.5c5.084 0 9.741-1.742 13.363-4.736l-6.177-5.065C29.284 36.473 26.784 37.5 24 37.5c-5.202 0-9.611-3.325-11.217-7.946l-6.523 5.032C8.794 40.055 15.849 44.5 24 44.5z"/><path fill="#EA4335" d="M43.611 20.083h-1.861V20H24v8h11.303c-0.7 2.002-2.088 3.708-3.952 4.699l6.177 5.065C39.969 39.212 44.5 32.5 44.5 24c0-1.305-.138-2.574-.389-3.833z"/></g></svg>
          Continue with Google
        </span>
      </button>
      <div style={{textAlign:'center',margin:'1em 0',color:'#888',fontWeight:600,letterSpacing:'0.025em'}}>or</div>
      <form onSubmit={handleSubmit} style={{width:'100%',display:'flex',flexDirection:'column',gap:'0.9em'}}>
        <input name="username" type="text" placeholder="Username" value={form.username} onChange={handleChange} required style={{width:'100%',padding:'0.8em',borderRadius:8,border:'1px solid #ddd',fontSize:'1.05em'}} />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required style={{width:'100%',padding:'0.8em',borderRadius:8,border:'1px solid #ddd',fontSize:'1.05em'}} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required style={{width:'100%',padding:'0.8em',borderRadius:8,border:'1px solid #ddd',fontSize:'1.05em'}} />
        {error && <div style={{color:'red',marginBottom:'1em'}}>{error}</div>}
        <button type="submit" disabled={loading} style={{width:'100%',padding:'0.8em',background:'#2563eb',color:'#fff',border:'none',borderRadius:8,fontWeight:700,fontSize:'1.08em',cursor:'pointer',marginTop:'0.6em',boxShadow:'0 2px 8px #2563eb22',transition:'background 0.2s'}}>
          {loading ? 'Registering...' : 'Register / Login'}
        </button>
      </form>
    </div>
  );
}
