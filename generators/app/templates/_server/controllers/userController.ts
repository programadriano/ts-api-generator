import UserRepository from '../repositories/userRepository';
import * as httpStatus from 'http-status';


const sendReponse = function (res, statusCode, data) {
  res.status(statusCode).json({ 'result': data })
}

class UserController {
  constructor() { }

  get(req, res, next) {
    UserRepository
        .getAll()
        .then(radio => sendReponse(res, httpStatus.OK, radio))
        .catch(err => console.error.bind(console, `Error ${err}`))
}
}

export default new UserController();
