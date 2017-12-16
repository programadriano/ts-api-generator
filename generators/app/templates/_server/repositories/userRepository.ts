import * as mongoose from 'mongoose';
import UserSchema from '../schemas/userSchema';

class UserRepository {
  private model;

    constructor() {
      this.model = mongoose.model('User', UserSchema);
     }

        getAll() {
          return this.model.find({});
        }

        getById(_id) {
          return this.model.findById(_id);
        }

        create(user) {
          return this.model.create(user);
        }

        update(_id, user) {
          const updateUser = (<any>Object).assign({}, user);
          return this.model.findByIdAndUpdate(_id, updateUser, { new: true });
        }

        delete(_id) {
          return this.model.findByIdAndRemove(_id);
        }

}


export default new UserRepository;
