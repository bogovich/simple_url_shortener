import mongoose from "mongoose";
import validator from "validator";
import { passwordReg } from "../validations/user.js";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required!"],
      trim: true,
      minlength: [4, "Username need to be longer!"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "email required"],
      unique: [true, "email already registered"],
      trim: true,
      validate: {
        validator(email) {
          return validator.isEmail(email);
        },
        message: "{VALUE} is not a valid e-mail!",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
      trim: true,
      minlength: [6, "Password need to be longer!"],
      validate: {
        validator(password) {
          return passwordReg.test(password);
        },
        message: "{VALUE} is not a valid password",
      },
    },
    createdAt: {
      type: String,
      default: Date.now,
    },
    salt: {
      type: String,
    },
  },
  { collection: "users" }
);

UserSchema.pre("save", async function (next) {
  try {
    const user = this;
    if (!user.isModified("password")) next();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    this.salt = salt;
    next();
  } catch (error) {
    return next(error);
  }
});

UserSchema.methods.validPassword = async (password) => {
  return await bcrypt.compare(password, this.local.password);
};

export default mongoose.model("User", UserSchema);
