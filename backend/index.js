import express, { json } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log('Connected to MongoDB!')
}).catch((err) => {
  console.log(err);
})

app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

//error middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message
  });
})


app.listen(3000, () => {
  console.log('Server is running on PORT 3000');
})