import "express-async-errors";
import express from "express";
import { Mongo } from "./mongo";
import { config } from "dotenv";
import { UserController } from "./user/controller/controller";
import { ProfileController } from "./profile/controller/controller";
import cors from "cors";
import bodyParser from "body-parser";
import { errorMiddleware } from "./customError/errorMiddleware";

config();

const controllers = [new UserController(), new ProfileController()].map(
  (c) => c.router
);

const app = express()
  .use(cors())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(express.json())
  .use("/", controllers)

  .use(errorMiddleware);

Mongo.connect(process.env.DB_URL!)
  .then(() =>
    app.listen(process.env.PORT || 3000, () =>
      console.log("Server started on port: " + process.env.PORT || 3000)
    )
  )
  .catch(console.log);
