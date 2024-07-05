import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import cors from "cors";
import morgan from "morgan";
import { type HttpError } from "./libs/httpError";
import routes from "./routes";

const app = express();

app.use(morgan("dev"));
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) { callback(null, true); return; }
      const allowedOrigins = ["http://localhost:3000"];
      if (!allowedOrigins.includes(origin)) {
        const msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        callback(new Error(msg), false); return;
      }
      callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", routes);

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  return res
    .status(err.code < 600 ? err.code : 500)
    .json({ ...err, message: err.message });
});

export default app;
