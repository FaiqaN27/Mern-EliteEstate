import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserFailure, updateUserStart, updateUserSuccess } from '../redux/user/userSlice';

const Profile = () => {

  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const { loading, error, currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setUpdateSuccess(false);
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    }
    catch (err) {
      dispatch(updateUserFailure(err.message));
    }
  }
  return (
    <div className='p-3 max-w-lg mx-auto mb-12'>

      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>

      <form onSubmit={handleUpdate} className='flex flex-col gap-5'>
        <img src={currentUser.avatar} className='rounded-full w-25 h-25 object-cover cursor-pointer self-center mt-2' alt='profile' />

        <input type='text' className='rounded-lg p-3 bg-white focus:outline-none' placeholder='username' id='username' defaultValue={currentUser.username} onChange={handleChange} />

        <input type='email' className='rounded-lg p-3 bg-white focus:outline-none' placeholder='email' id='email' defaultValue={currentUser.email} onChange={handleChange} />

        <input type='password' className='rounded-lg p-3 bg-white focus:outline-none' id='password' placeholder='password' onChange={handleChange} />

        <button disabled={loading} className='bg-slate-700 p-3 rounded-lg uppercase text-white cursor-pointer hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading ...' : 'Update'}</button>
      </form>

      {/* <button className='bg-green-700 p-3 rounded-lg uppercase text-white cursor-pointer hover:opacity-95 disabled:opacity-80'>Create Listing</button> */}

      <div className='flex justify-between mt-5'>
        <span className='text-red-700 hover:underline cursor-pointer'>Delete Account</span>
        <span className='text-red-700 hover:underline cursor-pointer'>Sign out</span>
      </div>

      <p className='text-red-700 mt-5'>{error ? error : ''}</p>
      <p className='text-green-700 mt-5'>{updateSuccess ? 'User Is Updated Successfully!' : ''}</p>
    </div>
  )
}

export default Profile