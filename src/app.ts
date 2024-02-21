import "express-async-errors";
import express from "express";
import { Mongo } from "./mongo";
import cors from "cors";
import bodyParser from "body-parser";
import { errorMiddleware } from "./customError/errorMiddleware";
import fileUpload from "express-fileupload";
import env from "./enviroment";
import { controllers } from "./controllers";

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