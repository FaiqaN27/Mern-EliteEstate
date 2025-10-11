import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserFailure, signOutUserStart, signOutUserSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from '../redux/user/userSlice';
import { Link } from 'react-router-dom';

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

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));

    }
    catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  }

  const handleUserSignout = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success == false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    }
    catch (err) {
      dispatch(signOutUserFailure(error.message));
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto mb-12'>

      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>

      <form onSubmit={handleUpdate} className='flex flex-col gap-5'>

        <img src={currentUser?.avatar} className='rounded-full w-25 h-25 object-cover cursor-pointer self-center mt-2' alt='profile' />

        <input type='text' className='rounded-lg p-3 bg-white focus:outline-none' placeholder='username' id='username' defaultValue={currentUser.username} onChange={handleChange} />

        <input type='email' className='rounded-lg p-3 bg-white focus:outline-none' placeholder='email' id='email' defaultValue={currentUser.email} onChange={handleChange} />

        <input type='password' className='rounded-lg p-3 bg-white focus:outline-none' id='password' placeholder='password' onChange={handleChange} />

        <button disabled={loading} className='bg-slate-700 p-3 rounded-lg uppercase text-white cursor-pointer hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading ...' : 'Update'}</button>

        <Link className='bg-green-700 p-3 rounded-lg uppercase text-center text-white cursor-pointer hover:opacity-95' to={'/create-listing'}> Create Listing</Link>

      </form>

      <div className='flex justify-between mt-5'>
        <span className='text-red-700 hover:underline cursor-pointer' onClick={handleDeleteUser}>Delete Account</span>
        <span className='text-red-700 hover:underline cursor-pointer' onClick={handleUserSignout}>Sign out</span>
      </div>

      <p className='text-red-700 mt-5'>{error ? error : ''}</p>
      <p className='text-green-700 mt-5'>{updateSuccess ? 'User Is Updated Successfully!' : ''}</p>
    </div>
  )
}

export default Profile