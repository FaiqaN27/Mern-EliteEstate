import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    }
    catch (err) {
      setLoading(false);
      setError(err.message);
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>

      <form className="flex flex-col gap-6" onSubmit={handleForm}>
        <input className="bg-white p-3 rounded-lg focus:outline-none" type="text" placeholder="Username" id="username" onChange={handleChange} />

        <input type="email" placeholder="Email" id="email" className="bg-white p-3 rounded-lg focus:outline-none" onChange={handleChange} />

        <input type="password" placeholder="Password" className="bg-white p-3 rounded-lg focus:outline-none" onChange={handleChange} id='password' />

        <button disabled={loading} className="uppercase bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80 cursor-pointer">{loading ? 'Loading ...' : 'Sign Up'}</button>
      </form>

      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={'/sign-in'}><span className='text-blue-700 hover:underline'>Sign in</span></Link>
      </div>
      {error && <p className='text-red-700 mt-5'>{error}</p>}
    </div>
  )
}

export default SignUp