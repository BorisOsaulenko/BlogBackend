import { UserRepository } from "../user/repository/userRepository";

export const checkDoesUserExists = async (emailOrId: string) => {
  return !!(
    (await UserRepository.getByEmail(emailOrId)) ||
    (await UserRepository.getById(emailOrId))
  );
};
