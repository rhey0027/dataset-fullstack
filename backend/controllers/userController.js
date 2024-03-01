import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

// Creating token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_CODE, {
    expiresIn: '1d'
  })

}
// signupUser
const signupUser = async(req, res) => {
  const { name, email, password } = req.body;

    try{
      const user = await User.signup(name, email, password);
      const token = createToken(user._id);
      res.status(201).json({ email, token });
    }
    catch(error){
        res.status(400).json({ error: error.message });
    }
}
// loginUser
const loginUser = async(req, res) => {
  const { email, password } = req.body;
    try{
      const user = await User.login(email, password);
      const token = createToken(user._id);
      res.status(200).json({ email, token});
    }
    catch(error){
        res.status(400).json({ error: error.message });
    }
}

export { signupUser, loginUser }