import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    fullname : {
        firstname : {
            type : String,
            required : true,
            minLength : [3, "First Name must be atleast 3 characters long"],
        },
        lastname : {
            type : String,
            minLength : [3, "Last Name must be atleast 3 characters long"],
        },
    },
    email : {
        type : String,
        required : true,
        minLength : [5, "Email must be at least 5 characters long"],
    },
    password : {
        type : String,
        required : true,
        select : false, //so that whenever we search a user system doesn't consider this parameter when comparing
    },
    socketId : {
        type : String,
    },
})

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async(password) => {
    return await bcrypt.hash(password, 10);
}

const userModel = mongoose.model('User', userSchema);
export default userModel;