const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Login = require('../models/loginSchema');
const {SUCCESS, FAIL, USER_EXISTS, USER_NOT_EXISTS, PASSWORD_INCORRECT} = require('../status/statusConstants') 
const Status = require('../status/Status') 

async function loginUser(username, password){
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    // Find user information
    const foundUser = await Login.findOne({username: username})
    if(!foundUser){
        return(new Status(400, USER_NOT_EXISTS, "username does not exists"));
    }
    
    // Match password with the salted hash in the database.
    bcrypt.compare(hashedPassword, foundUser.password, (err, result) => {
        if (err) {
            console.error(err);
            return(new Status(500, FAIL, "something went wrong"));
        }
        if(!result){
            return(new Status(400, PASSWORD_INCORRECT, "incorrect password"));
        }
    });

    // Sign and return a JWT.
    const accessToken = await jwt.sign(
        {subject: foundUser._id}, 
        process.env.JWT_SECRET, 
        { expiresIn: '1d' }
    )
    return(new Status(200, SUCCESS, accessToken));

}

module.exports =  {loginUser};