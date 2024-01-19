import { Mongo } from "../../../mongo";
import { sendActivationEmail } from "../../../nodemailer";
import { Role, Credentials } from "../../user";

export const register = async (creds: Credentials) => {
  const activationNumber = Math.floor(100000000 + Math.random() * 900000000); // random 9 digit number
  sendActivationEmail(
    creds.email,
    `http://localhost:8080/activation/?code=${activationNumber}&email=${creds.email}`
  );
  return await Mongo.users().insertOne({
    ...creds,
    activationNumber,
    isActive: false,
    roles: [Role.USER],
    createdAt: new Date(),
    sponsors: [],
  });
};
