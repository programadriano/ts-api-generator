import UserSchema from '../repositories/userRepository';

class UserController {
  constructor() { }

  getAll() {
    return UserSchema.find({});
  }
}

export default new UserController();
