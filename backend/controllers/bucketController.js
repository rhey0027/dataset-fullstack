import mongoose from "mongoose";
import Bucket from "../models/bucketModel.js";

//get all data
const getBuckets = async (req, res) => {
  const  user_id = req.user._id
  const bucket = await Bucket.find({user_id}).sort({ createdAt: -1 });
  res.status(200).json(bucket);
}

/*
//get data by id
const getBucket = async (req, res) => {
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: 'Invalid Key Detected!' });
  }
  const bucket = await Bucket.findById(id);

  if (!bucket) return res.status(400).json({ msg: 'Record not found' });
  res.status(200).json(bucket);
}
*/

//create a data
const createBucket = async (req, res) => {
  const { title, timeline, description } = req.body
  
// check for emptyFields
  let emptyFields = [];

    if(!title) {
      emptyFields.push('title')
    }
    if(!timeline) {
      emptyFields.push('timeline')
    }
    if(!description) {
      emptyFields.push('description')
    }
    if( emptyFields.length > 0 ) {
      return res.status(400).json({ error: 'All fields are required!', emptyFields })
    }
  // const exists = await Bucket.findOne({ title });
  // if (exists) return res.status(400).json({ msg: 'Record already exists' });
    try{
      const user_id = req.user.id;
      const bucket = await Bucket.create({ title, timeline, description, user_id })
      res.status(201).json(bucket)
    }
    catch(error){
      res.status(400).json({ error: error.message})
    }
  }

  /*
//updata data by id
const updateBucket = async (req, res) => {
  const { id } = req.params;
  
  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: 'Invalid Key Detected!' });
  }
  const bucket = await Bucket.findOneAndUpdate({id})
  if(bucket) {
    bucket.title = req.body.title || bucket.title;
    bucket.timeline = req.body.timeline || bucket.timeline;
    bucket.description = req.body.description || bucket.description;
  }
  const updatedBucket = await bucket.save();
  res.status(200).json({msg: 'Record updated!', updatedBucket});
}
*/

//delete a data by id
const deleteBucket = async (req, res) => {
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: 'Invalid Key Detected!' });
  }
  const bucket = await Bucket.findByIdAndDelete({ _id: id })
  if(!bucket) {
    return res.status(400).json({ msg: 'Record not found' });
  } 
  res.status(200).json(bucket);
}

export { getBuckets, createBucket, deleteBucket };
