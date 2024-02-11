import { UserService } from "../../user/service/service";
import { Role, User } from "../../user/user";

import { email, password } from "./user.test";

const mockedUserService = new UserService();
mockedUserService.register = jest.fn().mockReturnValueOnce(Promise<void>);
mockedUserService.login = jest
  .fn()
  .mockImplementationOnce(async (): Promise<User> => {
    return {
      email,
      password,
      roles: [Role.USER],
      sponsors: [],
      following: [],
      likedPosts: [],
      createdAt: Date.now(),
      isActive: true,
      activationNumber: 1000000, // million
    };
  });

export { mockedUserService };
