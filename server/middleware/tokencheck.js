var jwt = require('jsonwebtoken');
const _ = require('lodash');

var tokencheck = (req,res,next) => {
    var token = req.header('token') || req.body.token ;
    console.log("toke ", token);
    if(token)
    {
     jwt.verify(token, 'abc123', (err, decoded) =>{
        if(err)
        {
          return res.status(400).json({message: 'Unauthorized User.' });
        }
        req.decoded = decoded;
        next();
     });
    } else{
      next();
      }
  };
        
module.exports = {tokencheck};