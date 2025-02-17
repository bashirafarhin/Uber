import userModel from "../Database/models/user.model.js";

// this function is just to create user
const createUser = async({ firstname, lastname, email, password}) => {
    if(!firstname || !email || !password){
        throw new Error('All fields are required');
    }
    const user = userModel.create({
        fullname : {
            firstname,
            lastname
        },
        email,
        password
    });
    return user;
}

const userService = {
    createUser
}

export default userService;