import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { signInSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          username: result.user.displayName,
          email: result.user.email,
          profilePicture: result.user.photoURL,
        })
      })
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate('/');
    }
    catch (error) {
      console.log('Counld not sign in with google', error);
    }
  }

  return (
    <button onClick={handleGoogleSignIn} type="button" className="bg-red-700 p-3 text-white uppercase rounded-lg cursor-pointer hover:opacity-95 disabled:opacity-80">Continue with google</button>
  )
}

export default OAuth;
