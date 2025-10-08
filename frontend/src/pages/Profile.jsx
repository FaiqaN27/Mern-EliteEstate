import { useSelector } from 'react-redux';

const Profile = () => {

  const { currentUser } = useSelector(state => state.user);

  return (
    <div className='p-3 max-w-lg mx-auto mb-12'>

      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>

      <form className='flex flex-col gap-5'>
        <img src={currentUser.avatar} className='rounded-full w-25 h-25 object-cover cursor-pointer self-center mt-2' alt='profile' />

        <input type='text' className='rounded-lg p-3 bg-white focus:outline-none' placeholder='username' id='username' default={currentUser.username} />

        <input type='email' className='rounded-lg p-3 bg-white focus:outline-none' placeholder='email' id='email' default={currentUser.email} />

        <input type='password' className='rounded-lg p-3 bg-white focus:outline-none' id='password' placeholder='password' />

        <button className='bg-slate-700 p-3 rounded-lg uppercase text-white cursor-pointer hover:opacity-95 disabled:opacity-80'>Update</button>

        {/* <button className='bg-green-700 p-3 rounded-lg uppercase text-white cursor-pointer hover:opacity-95 disabled:opacity-80'>Create Listing</button> */}
      </form>

      <div className='flex justify-between mt-5'>
        <span className='text-red-700 hover:underline cursor-pointer'>Delete Account</span>
        <span className='text-red-700 hover:underline cursor-pointer'>Sign out</span>
      </div>
    </div>
  )
}

export default Profile