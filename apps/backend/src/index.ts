import express, { Application } from "express";
import cors from "cors";
import "./setup/mongoose";
import dotenv from "dotenv";
import { errorMiddleware } from "./utils/errorMiddleware";

dotenv.config();

import routes from "./routes";

const app: Application = express();
const port = process.env.PORT || 8000;
app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

import "./setup/passport";
import "./setup/mongoose";

app.use(errorMiddleware);
app.use("/", routes);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port} `);
});
