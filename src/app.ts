import "express-async-errors";
import { Mongo } from "./mongo";
import { config } from "dotenv";
import { UserController } from "./user/user.controller";
import { errorMiddleware } from "./error/error.handler";
import { PostController } from "./post/post.controller";
import { TagController } from "./Tag/tag.controller";

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

config();

const controllers = [
  new UserController(),
  new PostController(),
  new TagController(),
].map((c) => c.router);

const app = express()
  .use(cors())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(express.json())
  .use("/", controllers)
  .use(errorMiddleware);

Mongo.connect(process.env.DB_URL as string)
  .then(() =>
    app.listen(process.env.PORT || 3000, () =>
      console.log("Server started on port: " + process.env.PORT || 3000)
    )
  )
  .catch(console.log);
