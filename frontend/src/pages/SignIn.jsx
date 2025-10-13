import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInFailure, signInSuccess } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

const SignIn = () => {

  const [formData, setFormData] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message))
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    }
    catch (err) {
      dispatch(signInFailure(error.message))
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto ">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input type="email" placeholder="Email" id="email" className="bg-[#D6E6FF] rounded-lg p-3 focus:outline-none" onChange={handleChange} />

        <input type="password" placeholder="Password" id="password" className="bg-[#D6E6FF] p-3 rounded-lg focus:outline-none" onChange={handleChange} />

        <button disabled={loading} className="bg-[#0D47C7] font-semibold p-3 rounded-lg text-white uppercase cursor-pointer hover:opacity-90 disabled:opacity-80">{loading ? 'Loading...' : 'Sign In'}</button>
        <OAuth />
      </form>

      <div className="flex gap-2 mt-5">
        <p>Dont have an account?</p>
        <Link to={'/sign-up'}><span className="text-[#0D47C7] font-semibold hover:underline">Sign up</span></Link>
      </div>

      {error && <p className="text-red-700 mt-5">{error}</p>}
    </div>
  )
}

export default SignIn