import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bucketRoute from './routes/bucketRoute.js'
import userRoute from './routes/userRoute.js'
import cors from 'cors';



import urlencoded from 'express';
const app = express();
app.use(express.json())
dotenv.config()
// port
const port = process.env.PORT || 5000
app.use(urlencoded({ extended: true}))

// middleware for route
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})
app.use('/buckets', bucketRoute)
app.use('/users', userRoute)

// cors
app.use(cors());
app.use(cors({
  origin: "https://dataset-fullstack.vercel.app/"
})
);

app.get('/',(req, res) => {
  res.json({msg: 'Server is active, all users account...'})
})

// database
const connect = async() => {
  try{
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected from database...')
  }catch(error){
    console.log('Disconnected from database...')
  }
}
  app.listen(port, () => {
    connect()
    console.log(`Active on port- ${port}`)
  })

module.exports = app;