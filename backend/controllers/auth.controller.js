import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { handleError } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const handleUserSignup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json({ message: 'User Created Successfully' });
  }
  catch (error) {
    next(error);
  }
}

export const handleUserSignin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return next(handleError(404, 'User not found'));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      return next(handleError(401, 'Invalid credentials'));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    const { password: hashedPassword, ...rest } = validUser._doc;

    res
      .cookie('token', token, { httpOnly: true })
      .status(200)
      .json(rest);
  }
  catch (error) {
    next(error);
  }

}

export const handleGoogleAuth = async (req, res, next) => {
  try {
    //if user exists
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      const { password: hashPassword, ...rest } = user._doc;

      res.
        cookie('token', token, { httpOnly: true }).
        status(200).
        json(rest);
    }
    else {
      //if new user
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      const name = req.body.username.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4);

      const newUser = new User({
        username: name,
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.profilePicture,
      })

      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: hashPassword, ...rest } = newUser._doc;

      res.
        cookie('token', token, { httpOnly: true }).
        status(200).
        json(rest);
    }
  }
  catch (error) {
    next(error);
  }
}
