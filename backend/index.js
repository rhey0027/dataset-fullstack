import express from 'express';
import "dotenv/config";
import http from 'http';
import mongoose from 'mongoose';
import bucketRoute from './routes/bucketRoute.js'
import userRoute from './routes/userRoute.js'
import cors from 'cors';
dotenv.config()

const app = express();

// cors
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: false}));

// port
const port = process.env.PORT || 5000

const server = http.createServer(app);

// middleware for route
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})
app.use('/buckets', bucketRoute)
app.use('/users', userRoute)

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

