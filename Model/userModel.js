import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please provide name"],
      minLength: 3,
    },
    email: {
      type: String,
      required: [true, "please provide email"],
      uinque: true,
      match: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "please provide password"],
      minLength: 6,
    },
  },
  { timestamps: true }
);

/**Mongoose middleware functions*/
// this is used to hash password even before saving it to database
UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//this is used to compare hasedpassword to the user given password
UserSchema.methods.comparePassword = async function (givenPassword) {
  const isCorrect = bcrypt.compare(givenPassword, this.password);
  return isCorrect;
};

//this is used to create jwt token
UserSchema.methods.createToken = async function () {
  const token = await jwt.sign(
    { id: this._id, isAdmin: this.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: "48h" }
  );
  return token;
};

export const User = mongoose.model("Users", UserSchema);

// creates schema for the user and implemented some middlewares
