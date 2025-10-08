import { handleError } from "../utils/error.js";
import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';

export const handleTestApiRoute = (req, res) => {
  res.send("Hi! Getting Response from Server");
}

export const handleProfileUpdate = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(handleError(401, 'You can only update your own account!'));
  }

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      $set: {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        avatar: req.body.profilePicture
      }
      //new bsically updates the data if not use then updated data will not return
    }, { new: true })

    const { password: hashPassword, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  }
  catch (err) {
    next(err);
  }
}