const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');

const authenticate = async (req, res, next) => {

    try {
        const token = req.cookies.myCookie;
        // console.log(token);
        if (!token) {
            return res.status(401).json({status:401, error: 'Unauthorized User' });
          }
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const rootUser = await User.findOne({_id:verifyToken._id, "tokens.token": token});

        if(!rootUser){throw new Error("User not found...")};
        
        req.token = token;
        req.rootUser = rootUser;
        req.id = rootUser._id;

        next();
    } catch (error) {
        res.status(401).send("Unauthorised User....");
    }


    
}

module.exports = authenticate;