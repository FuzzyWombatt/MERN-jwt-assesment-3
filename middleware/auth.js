const Jwt = require('jsonwebtoken');

const data = require("../config/default.json");

//exporting as anymous function for middleware routing in express
module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');

    //check if not token 
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = Jwt.verify(token, data.jwtsecret);

        req.user = decoded.user;
        next();
    } catch (err) {
        return res.status(401).json({ msg: 'invalid token' });
    }

}