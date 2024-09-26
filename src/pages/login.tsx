import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/admin/login', { email, password });
      if (response.data.success) {
        console.log(""+response.data.emailID)
        
        if(response.data.emailID == 'admin@example.com'){
          localStorage.setItem('adminToken', response.data.token);
          router.push('/dashboard/admin'); // Redirect to dashboard on successful login of admin
        }else{
          localStorage.setItem('merchantToken', response.data.token);
          router.push('/dashboard/merchant'); // Redirect to dashboard on successful login of merchants
        }
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-400">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Admin Login</h2>
        <h6 className="text-xs mb-4 text-center text-blue-600">JSC Global Solutions Inc.</h6>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded-md text-black"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded-md text-black"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
