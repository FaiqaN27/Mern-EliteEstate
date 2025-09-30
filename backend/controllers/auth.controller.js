import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

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