import express from 'express'

const router = express.Router()

import { getBuckets, createBucket, deleteBucket} from '../controllers/bucketController.js'
import  requireAuth from '../middleware/requireAuth.js'

router.use(requireAuth)
//get all data
router.get('/', getBuckets)
// get a single data
// router.get('/:id', getBucket)
// create a data
router.post('/',createBucket)
// update a single data
// router.put('/:id', updateBucket)
// delete a single data
router.delete('/:id', deleteBucket)



export default router