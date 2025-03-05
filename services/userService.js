import bcrypt from "bcryptjs";
import User from "../models/UserModel.js";
import {
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
} from "../utils/errorCodes.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";

export const UserService = {
  async getAllUsers() {
    const users = await User.find();
    return users;
  },
  async registerUser({ email, password, name }) {
    if (!email || !password || !name) {
      throw new BadRequestException("Email and password are required.");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashedPassword });

    return user.id;
  },
  async loginUser({ email, password }) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new NotFoundException("User not found.");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException("Invalid credentials.");
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return { message: "Login successful.", token, role: user.role };
  },
  async deregisterUser({ email, password }) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new NotFoundException("User not found.");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException("Invalid credentials.");
    }

    await user.deleteOne();
    return { message: "User de-registered successfully." };
  },
  async getUserDetails({}, { id }) {
    const user = await User.findOne({ _id: id });
    if (!user) {
      throw new NotFoundException("User not found.");
    }
    return user;
  },
  async changePassword({ email, newPassword }) {
    const user = await User.findOne({ email });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    return { message: "Password changed successfully." };
  },

  async whoAmI(body, _params, req) {
    const userId = req.user.id;
    const user = await User.findOne({ _id: userId }).select("-password");
    return user;
  },
};
