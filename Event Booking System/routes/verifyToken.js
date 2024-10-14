// const dotenv = require('dotenv');
const jwt = require("jsonwebtoken");

// module.exports = function(req,res,next){
//     const token = req.headers['auth-token'];
//     if(!token) return res.status(401).send('Access denied.');

//     try{
//         const verified = jwt.verify(token, process.env.TOKEN_SECRET);
//         req.user = verified;
//         next();
//     }catch(err){
//         return res.status(400).send('Invalid token.');
//     }
    
// }

const verifyToken = (req, res, next) => {
    // console.log(req.headers);
    const token = req.headers['auth-token'];
    // console.log(token);
    if (!token) {
        res.status(401).send('Unauthorized');
        return;
    }

    jwt.verify(token, "lol249", (err, user) => {
        if (err) {
            res.status(403).send('Forbidden');
            return;
        }

        next();
    });
};
module.exports= verifyToken;