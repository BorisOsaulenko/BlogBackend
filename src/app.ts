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

config();

const controllers = [
  new UserController(),
  new ProfileController(),
  new PostController(),
].map((c) => c.router);

const app = express()
  .use(cors())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(express.json())
  .use(fileUpload())
  .use("/", controllers)

  .use(errorMiddleware);

Mongo.connect(process.env.DB_URL!)
  .then(() =>
    app.listen(process.env.PORT || 3000, () =>
      console.log("Server started on port: " + process.env.PORT || 3000)
    )
  )
  .catch(console.log);
