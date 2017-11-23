
import UserController from '../controllers/userController';
import * as httpStatus from 'http-status';

import jwt = require("jsonwebtoken");

const sendReponse = function (res, statusCode, data) {
  res.status(statusCode).json({ 'result': data })
}

class UserRoute {

  constructor() { }


  getAll(req, res, next) {
    UserController
      .getAll()
      .then(programs => sendReponse(res, httpStatus.OK, programs))
      .catch(err => console.error.bind(console, `Error ${err}`))
  }

}

export default new UserRoute;
