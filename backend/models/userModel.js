import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
 
}, {timestamps: true})

// signup and login function declaration

userSchema.statics.signup = async function( name, email, password ) {
  
  if(!name || !email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  const exists = await this.findOne({ email });
    if(exists) {
      throw Error("Email already in use");
  }
  const salt = await bcrypt.genSalt(2);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ name, email, password: hash });
  return user
};

// login

userSchema.statics.login = async function(email, password) {
  if(!email || !password) {
    throw Error("All fields must be filled");
  }
  const user = await this.findOne({ email });
    if(!user) {
      throw Error("Email doesn't exists!");
  }
  const isMatch = await bcrypt.compare( password, user.password )
    if(!isMatch) {
      throw Error('Incorrect email or password!');
    }
    return user;
}

const User = mongoose.model("User", userSchema);
export default User;