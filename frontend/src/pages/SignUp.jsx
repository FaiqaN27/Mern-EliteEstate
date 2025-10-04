import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>

      <form className="flex flex-col gap-6">
        <input className="bg-white p-3 rounded-lg focus:outline-none" type="text" placeholder="Username" id="username" />

        <input type="email" placeholder="Email" id="email" className="bg-white p-3 rounded-lg focus:outline-none" />

        <input type="password" placeholder="Password" className="bg-white p-3 rounded-lg focus:outline-none" />

        <button className="uppercase bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80 cursor-pointer">Sign Up</button>
      </form>

      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={'/sign-in'}><span className='text-blue-700 hover:underline'>Sign in</span></Link>
      </div>
    </div>
  )
}

export default SignUp