import * as mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String },
  age: { type: String }
});

export default UserSchema;
