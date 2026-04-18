import express, { Request, Response, urlencoded } from "express";
import cors from "cors";
import allRoutes from "./routes";
import globalErrorHandler from "./shared/globalErrorHandler";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.use(
  "/api/v1",
  async (req, res, next) => {
    setTimeout(() => {
      next();
    }, 2000);
  },
  allRoutes
);

app.get("/", (req: Request, res: Response) => {
  res.sendFile(__dirname + "/index.html");
});
app.use((req: Request, res: Response) => {
  res.status(404).send({ message: "Route not found", requested: req.url });
});

app.use(globalErrorHandler);

export default app;
