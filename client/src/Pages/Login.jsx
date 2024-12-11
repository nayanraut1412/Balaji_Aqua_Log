// import React, { useState } from 'react';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setError('');
//     setSuccess('');
//     setLoading(true);

//     // Basic validation
//     if (formData.username.length < 3) {
//       setLoading(false);
//       return setError('Username must be at least 3 characters');
//     }
//     if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       setLoading(false);
//       return setError('Invalid email format');
//     }
//     if (formData.password.length < 8) {
//       setLoading(false);
//       return setError('Password must be at least 8 characters');
//     }

//     try {
//       const response = await fetch('http://localhost:5000/api/user/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setSuccess('User registered successfully');
        
//         setFormData({ username: '', email: '', password: '' });
//       } else {
//         setError(data.message || 'Registration failed');
//       }
//     } catch (error) {
//       setError('An error occurred. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="p-8 bg-white rounded shadow-md w-full max-w-md">
//         <h1 className="text-2xl font-semibold mb-6 text-gray-700">Register</h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {error && <p className="text-red-500">{error}</p>}
//           {success && <p className="text-green-500">{success}</p>}

//           <div>
//             <label className="block text-lg text-gray-600">Username</label>
//             <input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//             />
//           </div>

//           <div>
//             <label className="block text-lg text-gray-600">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//             />
//           </div>

//           <div>
//             <label className="block text-lg text-gray-600">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//             />
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="w-full px-6 py-2 bg-green-600 text-white rounded-lg disabled:bg-gray-400"
//               disabled={loading}
//             >
//               {loading ? 'Registering...' : 'Register'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;




import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Login = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/user/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Login successful');
        localStorage.setItem('token', data.token); // Store JWT in localStorage
        localStorage.setItem('isLoggedIn', 'true');
        // localStorage.setItem('token', response.data.token);

        setFormData({ username: '', password: '' }); // Clear form

        // Redirect or navigate to a protected page
        // toast.success('Slot deleted successfully');

        toast.success('Login successful! Redirecting...');
        
        // toast.success('Signin successful! Redirecting to Dashboard...');
        setTimeout(() => {
          navigate('/neworder');
        }, 3000);

      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <ToastContainer position="top-right" autoClose={3000} closeOnClick pauseOnHover transition={Slide} /> {/* Toastify notifications */}
      <div className="p-8 bg-white rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-gray-700">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}

          {/* Username */}
          <div>
            <label className="block text-lg text-gray-600">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-lg text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-400"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
