import jwt from 'jsonwebtoken';
import User from '../models/userModel.js'; 

const requireAuth = async(req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ error: 'Authorization key required!'})
  }
  const token = authorization.split(' ')[1]

    try{
      const { id } = jwt.verify( token, process.env.JWT_CODE)
      req.user = await User.findById(id).select('_id')
      next()
      console.log(req.user)
    }
    catch(error){
      console.log(error)
      return res.status(401).json({ error: 'Request is not authorized!'})
    }
}

export default requireAuth;