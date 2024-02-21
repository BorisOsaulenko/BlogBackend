import { CommentController } from "./comment/controller/controller";
import { CommentRepository } from "./comment/repository/commentRepository";
import { CommentService } from "./comment/service/service";
import { PostController } from "./post/controller/controller";
import { PostRepository } from "./post/repository/postRepository";
import { PostService } from "./post/service/service";
import { ProfileController } from "./profile/controller/controller";
import { ProfileRepository } from "./profile/repository/profileRepository";
import { ProfileService } from "./profile/service/service";
import { TagController } from "./tag/controller/controller";
import { TagRepository } from "./tag/repository/repository";
import { TagService } from "./tag/service/service";
import { UserController } from "./user/controller/controller";
import { UserRepository } from "./user/repository/userRepository";
import { UserService } from "./user/service/service";
import { UserActivityRepository } from "./userActivity/repository/repository";

const userRepostiory = new UserRepository();
const profileRepostiory = new ProfileRepository(userRepostiory);
const userActivityRepostiory = new UserActivityRepository(
  userRepostiory,
  profileRepostiory
);

const tagRepository = new TagRepository();
const postRepository = new PostRepository();
const commentRepository = new CommentRepository();

export const controllers = [
  new UserController(
    new UserService(userRepostiory, profileRepostiory, userActivityRepostiory)
  ),
  new TagController(new TagService(tagRepository, userRepostiory)),
  new ProfileController(new ProfileService(profileRepostiory, userRepostiory)),
  new PostController(
    new PostService(postRepository, userRepostiory, profileRepostiory)
  ),
  new CommentController(
    new CommentService(commentRepository, profileRepostiory, userRepostiory)
  ),
].map((c) => c.router);
