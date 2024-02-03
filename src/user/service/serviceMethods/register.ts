import { UserRepository } from "../../repository/userRepository";
import { sendActivationEmail } from "../../../nodemailer";
import { Role, Credentials } from "../../user";
import bcrypt from "bcrypt";

export const register = async (creds: Credentials) => {
  const activationNumber = Math.floor(100000000 + Math.random() * 900000000); // random 9 digit number
  sendActivationEmail(
    creds.email,
    `https://sylvan-harmony-394109.nw.r.appspot.com/activation/?code=${activationNumber}&email=${creds.email}`
  );
  return await UserRepository.create({
    email: creds.email,
    password: bcrypt.hashSync(creds.password, 10),
    activationNumber,
    isActive: false,
    roles: [Role.USER],
    createdAt: new Date(),
    sponsors: [],
    following: [],
    likedPosts: [],
  });
};
