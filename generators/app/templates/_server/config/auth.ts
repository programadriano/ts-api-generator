
import jwt = require("jsonwebtoken");

import Config from '../config/configs';

class Auth {

    constructor() { }

    validate(req, res, next) {

        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        if (token) {
            jwt.verify(token, Config.secret, function (err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Falha ao tentar autenticar o token!' });
                } else {

                    console.log('OK')
                    next();
                }
            });
        } else {
            console.log('403')
            return res.status(403).send({
                success: false,
                message: '403 - Forbidden'
            });
        }
    }
}

export default new Auth;