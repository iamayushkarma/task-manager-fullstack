import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from "./routes/task.routes.js";
import errorHandler from "./middleware/error.middleware.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api", taskRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
