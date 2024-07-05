import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app";
import { blue } from "colorette";
dotenv.config();
mongoose.set("strictQuery", false);

const port = process.env.PORT ?? 3000;

app.listen(port, () => {
  console.log(
    blue(`Visit ${"http://localhost:" + port + "/api"} to access the API`)
  );
  console.log("Started server on port", process.env.PORT);
});
mongoose
  .connect(`${process.env.MONGO_URI!}`)
  .then(async () => {
    console.log("Connected to Database!");
  })
  .catch((err) => {
    console.error("Error connecting to database!", err);
  });

export default app;
