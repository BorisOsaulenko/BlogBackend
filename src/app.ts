import "express-async-errors";
import express from "express";
import { Mongo } from "./mongo";
import { config } from "dotenv";
import { UserController } from "./user/controller/controller";
import { ProfileController } from "./profile/controller/controller";
import cors from "cors";
import bodyParser from "body-parser";
import { errorMiddleware } from "./customError/errorMiddleware";
import fileUpload from "express-fileupload";
import { PostController } from "./post/controller/controller";
import { CommentController } from "./comment/controller/controller";
import { UserService } from "./user/service/service";
import { ProfileService } from "./profile/service/service";
import { TagController } from "./tag/controller/controller";
import { TagService } from "./tag/service/service";
import { PostService } from "./post/service/service";
import { CommentService } from "./comment/service/service";
import { env } from "./enviroment";

console.log(process.env.NODE_ENV);

config({ path: `./.${process.env.NODE_ENV}.env` });
env.checkEnvValid();

const controllers = [
  new UserController(new UserService()),
  new TagController(new TagService()),
  new ProfileController(new ProfileService()),
  new PostController(new PostService()),
  new CommentController(new CommentService()),
].map((c) => c.router);

const app = express()
  .use(cors())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(express.json())
  .use(fileUpload())
  .use("/", controllers)

  .use(errorMiddleware);

Mongo.connect(env.DB_URL)
  .then(() => app.listen(env.PORT, () => console.log("Server started on port: " + env.PORT)))
  .catch(console.log);

export default app;