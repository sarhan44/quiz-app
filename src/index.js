// index.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv"
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';

dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;
const DB = process.env.DB;

app.use(express.json())

// Connect to MongoDB using Mongoose
mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Define routes or other middleware
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/user', userRouter);
app.use('/auth', authRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
