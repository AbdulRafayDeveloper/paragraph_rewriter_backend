import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  successResponse,
  badRequestResponse,
  notFoundResponse,
  unauthorizedResponse,
  serverErrorResponse,
  conflictResponse,
} from "../../helpers/apiResponses.js";
import {
  findUser,
  findOneUser,
  createUser,
  updateUser
} from "../../services/userServices.js";
import generateForgetPasswordTemplate from "../../emailTemplates/forgetPasswordTemplate.js";
import sendEmail from "../../helpers/emailHelper.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return badRequestResponse(res, "Please provide all fields", null);
    }

    const user = await findUser({ email });
    if (user) {
      return conflictResponse(res, "User with this email already exists", null);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser({
      name,
      email,
      password: hashedPassword,
    });
    if (newUser) {
      return successResponse(res, "User is successfully created", newUser);
    } else {
      return serverErrorResponse(res, "Failed to create user");
    }
  } catch (error) {
    return serverErrorResponse(
      res,
      "Internal server error. Please try again later"
    );
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return badRequestResponse(res, "All fields are mandatory", null);
    }
    const user = await findOneUser({ email });

    const passwordCheck = await bcrypt.compare(password, user.password);

    if (user && passwordCheck && user.role === "user") {
      const userLoginToken = jwt.sign(
        {
          id: user._id,
          role: user.role,
        },
        process.env.USER_LOGIN_TOKEN,
        { expiresIn: "1d" }
      );
      return successResponse(
        res,
        "User has logged in successfully",
        userLoginToken
      );
    } else if (user && passwordCheck && user.role === "admin") {
      const adminLoginToken = jwt.sign(
        {
          id: user._id,
          role: user.role,
        },
        process.env.ADMIN_LOGIN_TOKEN,
        { expiresIn: "1d" }
      );
      return successResponse(
        res,
        "Admin has logged in successfully",
        adminLoginToken
      );
    } else {
      return notFoundResponse(res, "User credentials are not correct", null);
    }
  } catch (error) {
    console.log(error);
    return serverErrorResponse(
      res,
      "Internal Server Error.Please try again later"
    );
  }
};

const changePassword = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      return unauthorizedResponse(
        res,
        "The user is not authorized for this action",
        null
      );
    }
    const { previousPassword, newPassword, confirmPassword } = req.body;
    if (!previousPassword || !newPassword || !confirmPassword) {
      return badRequestResponse(res, "All fields are mandatory", null);
    }
    const user = await findOneUser({ _id: userId });
    if (!user) {
      return notFoundResponse(res, "User not found", null);
    }
    const checkPassword = await bcrypt.compare(previousPassword, user.password);
    if (!checkPassword) {
      return badRequestResponse(res, "Previous password is incorrect", null);
    }
    if (previousPassword === newPassword) {
      return badRequestResponse(
        res,
        "Previous password and new password should not be the same",
        null
      );
    }
    if (newPassword !== confirmPassword) {
      return badRequestResponse(res, "Passwords do not match", null);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    return successResponse(res, "Password has been changed successfully", user);
  } catch (error) {
    return serverErrorResponse(
      res,
      "Internal Server error Please try again later"
    );
  }
};

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return badRequestResponse(res, "Email is required", null);
    }

    const user = await findOneUser({ email });
    if (!user) {
      return notFoundResponse(res, "User not found", null);
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    await user.save();

    const subject = "Reset Your Password";
    const emailContent = generateForgetPasswordTemplate(user.name, otp);

    await sendEmail(email, subject, emailContent);

    const otpToken = jwt.sign(
      {
        email,
        otp,
      },
      process.env.FORGET_PASSWORD_TOKEN,
      { expiresIn: "1d" }
    );

    return successResponse(
      res,
      "OTP has been successfully sent to your email",
      otpToken
    );
  } catch (error) {
    console.log(error);
    return serverErrorResponse(
      res,
      "Internal server error. Please try again later!"
    );
  }
};
const verifyOtp = async (req, res) => {
  try {
    const { userOtp } = req.body; 
    const { email, otp } = req.otpData;

    if (!userOtp) {
      return badRequestResponse(res, "OTP is required", null);
    }
    if (userOtp !== otp) {
      return badRequestResponse(res, "Invalid OTP", null);
    }
    const user = await findOneUser({ email, otp });
    if (!user) {
      return notFoundResponse(
        res,
        "No user found with this email or OTP is invalid",
        null
      );
    }
    const otpAge = Date.now() - new Date(user.otpCreatedAt).getTime();
    const otpValidityDuration = 60 * 1000;

    if (otpAge > otpValidityDuration) {
      await updateUser(user._id, { otp: null, otpCreatedAt: null });
      return badRequestResponse(res, "OTP has expired", null);
    }
    const resetPasswordToken = jwt.sign(
      {email},
      process.env.RESET_PASSWORD_TOKEN,
      { expiresIn: "1d" }
    );
    await updateUser(user._id, { otp: null, otpCreatedAt: null });
    return successResponse(
      res,
      "OTP has been verified successfully",
      resetPasswordToken
    );
  } catch (error) {
    console.log(error);
    return serverErrorResponse(
      res,
      "Internal server error. Please try again later!",
    );
  }
};

const resetPassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword } = req.body;
    const { email } = req;

    if (!newPassword || !confirmPassword) {
      return badRequestResponse(res, "Both newPassword and confirmPassword are required", null);
    }

    if (newPassword !== confirmPassword) {
      return badRequestResponse(res, "New password and confirm password do not match", null);
    }
    const user = await findOneUser({ email });
    if (!user) {
      return notFoundResponse(res, "No user found with this email", null);
    }
    const isMatch = await bcrypt.compare(newPassword, user.password);
    if (isMatch) {
      return conflictResponse(
        res,
        "New password must be different from the previous password",
        null
      );
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return successResponse(res, "Password has been successfully reset", null);
  } catch (error) {
    return serverErrorResponse(res, "Internal server error. Please try again later!", error.message);
  }
};
export { registerUser, loginUser, changePassword, forgetPassword, verifyOtp, resetPassword };
