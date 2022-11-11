import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required!"],
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "email required"],
      unique: [true, "email already registered"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
      trim: true,
      minlength: [6, "Password need to be longer!"],
    },
    createdAt: {
      type: String,
      default: Date.now,
    },
  },
  { collection: "users" }
);

UserSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password);
};

export default mongoose.model("User", UserSchema);
