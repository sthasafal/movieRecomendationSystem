import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaFilm, FaUser, FaLock } from 'react-icons/fa';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const storedUser = JSON.parse(localStorage.getItem('user'));
      
      if (storedUser && storedUser.email === email && storedUser.password === password) {
        localStorage.setItem('loggedIn', 'true');
        navigate('/dashboard');
      } else {
        throw new Error('Invalid credentials. Please try again!');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
      <div className="w-100xl max-w-md bg-gray-900/80 backdrop-blur-md rounded-4xl shadow-2xl overflow-hidden border border-gray-800 slide-up">
        <div className="bg-gradient-to-r from-red-900 to-red-600 p-6 text-center">
          <FaFilm className="text-4xl mx-auto text-white mb-2" />
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="text-red-100">Continue your cinematic journey</p>
        </div>
        
        <form onSubmit={handleLogin} className="p-8 space-y-6">
          {error && (
            <div className="bg-red-900/50 text-red-100 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-gray-400" />
              </div>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-400"
                required
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-400"
                required
              />
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-300 ${isLoading ? 'bg-red-800 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 hover:shadow-lg'}`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </span>
            ) : 'Sign In'}
          </button>
          
          <div className="text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-red-400 hover:text-red-300 font-medium transition">
              Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;