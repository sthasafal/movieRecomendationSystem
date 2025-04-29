import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
      localStorage.setItem('loggedIn', 'true');
      navigate('/dashboard');
    } else {
      alert('Invalid credentials. Please try again!');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center px-4"
      style={{
        backgroundImage: `url('https://i.pinimg.com/736x/e5/3e/d0/e53ed079e51d89999101b4753850e25e.jpg')`,
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0" />

      {/* Login Content */}
      <div className="z-10 text-white text-center max-w-xl w-full">
        <h1 className="text-4xl font-extrabold mb-3">Unlimited movies, TV shows, and more</h1>
        <p className="text-3xl mb-3">Login to continue</p>

        <form onSubmit={handleLogin} className="bg-black/80 backdrop-blur p-6 rounded-md space-y-4 w-full max-w-md mx-auto">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
          <button
            type="submit"
            className="w-full h-14 bg-red-600 hover:bg-red-700 text-white text-lg font-bold rounded-md transition"
          >
            Login
          </button>
        </form>

        <p className="mt-5 text-base text-gray-300">
          Don’t have an account?{' '}
          <Link to="/register" className="text-red-400 hover:underline font-medium">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
