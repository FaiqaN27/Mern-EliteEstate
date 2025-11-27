import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Profile = () => {
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const { loading, error, currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setUpdateSuccess(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(
        `${API_BASE_URL}/api/user/update/${currentUser._id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (err) {
      dispatch(updateUserFailure(err.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(
        `${API_BASE_URL}/api/user/delete/${currentUser._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleUserSignout = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success == false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (err) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="p-3 max-w-lg mx-auto mb-12">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>

      <form onSubmit={handleUpdate} className="flex flex-col gap-5">
        <img
          src={currentUser?.avatar}
          className="rounded-full w-25 h-25 object-cover cursor-pointer self-center mt-2"
          alt="profile"
        />

        <input
          type="text"
          className="rounded-lg p-3 bg-background focus:outline-none"
          placeholder="username"
          id="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />

        <input
          type="email"
          className=" rounded-lg p-3 bg-background focus:outline-none"
          placeholder="email"
          id="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />

        <input
          type="password"
          className="rounded-lg p-3 bg-background focus:outline-none"
          id="password"
          placeholder="password"
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="bg-primary p-3 rounded-lg uppercase text-white font-semibold cursor-pointer hover:opacity-90 disabled:opacity-80"
        >
          {loading ? "Loading ..." : "Update"}
        </button>

        <Link
          className="bg-action p-3 rounded-lg uppercase font-semibold text-center text-white cursor-pointer hover:opacity-90"
          to={"/create-listing"}
        >
          {" "}
          Create Listing
        </Link>
      </form>

      <p className="text-danger mt-5">{error ? error.message : ""}</p>
      <p className="text-action mt-5">
        {updateSuccess ? "User Is Updated Successfully!" : ""}
      </p>

      <div className="flex justify-between mt-5">
        <span
          className="text-danger hover:underline cursor-pointer"
          onClick={handleDeleteUser}
        >
          Delete Account
        </span>
        <span
          className="text-danger hover:underline cursor-pointer"
          onClick={handleUserSignout}
        >
          Sign out
        </span>
      </div>

      <div className="flex justify-center mt-5">
        <Link to={"/show-listings"}>
          <span className="text-action hover:underline font-semibold mt-5">
            Show Listings
          </span>
        </Link>
      </div>
      {loading && <Loader />}
    </div>
  );
};

export default Profile;
