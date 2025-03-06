import User from "../models/UserModel.js";
import bcryptjs from "bcryptjs";
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from "../utils/errorCodes.js";

export const validateRegister = async (body) => {
  let { name, email, password } = body;

  if (!name || !email || !password) {
    throw new BadRequestException("All fields are required.");
  }

  email = email.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new BadRequestException("Invalid email format.");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new BadRequestException("User already exists.");
  }

  body.email = email;
};

export const validateLogin = async (body) => {
  let { email, password } = body;

  if (!email || !password) {
    throw new BadRequestException("Email and password are required.");
  }

  email = email.trim().toLowerCase();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new BadRequestException("Invalid email format.");
  }

  body.email = email;
};

export const validateDeregisterInput = (body) => {
  const { email, password, confirmPassword } = body;

  if (!email || !password || !confirmPassword) {
    throw new BadRequestException(
      "Email, password, and confirm password are required."
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new BadRequestException("Invalid email format.");
  }

  if (password !== confirmPassword) {
    throw new BadRequestException("Passwords do not match.");
  }
};

export const authenticateUserForDeRegister = async (body) => {
  const { email, password } = body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFoundException("User not found or email does not match.");
  }

  const isMatch = await bcryptjs.compare(password, user.password);
  if (!isMatch) {
    throw new UnauthorizedException("Invalid password.");
  }
};

export const validateChangePassword = async (body) => {
  const { email, oldPassword, newPassword, confirmPassword } = body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFoundException("User not found.");
  }

  if (!oldPassword || !newPassword || !confirmPassword) {
    throw new BadRequestException(
      "Old password, new password, and confirm password are required."
    );
  }

  if (newPassword === oldPassword) {
    throw new BadRequestException("New password cannot be the same as old password.");
  }

  const isMatch = await bcryptjs.compare(oldPassword, user.password);
  if (!isMatch) {
    throw new UnauthorizedException("Invalid password.");
  }

  if (newPassword !== confirmPassword) {
    throw new BadRequestException("Passwords do not match.");
  }
};

export const checkUserExists = async (_body, _res, _next, _params, req) => {
  const userId = req.user.id;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new NotFoundException("User not found.");
  }
}

export const validateForgotPassword = async (body, _res, _next, _params, req) => {
  const { otp } = body
  const verifyOTP = req.cookies.userOTP
  if (otp !== verifyOTP) {
    throw new UnauthorizedException("OTP is incorrect")
  }
}