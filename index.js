import express from "express";
import { PORT } from "./config/config.js";
import dbConn from "./db/db-conn.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js"
import { ErrorCodes } from "./utils/errorCodes.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";

const app = express();
app.use(express.json());
app.use(authMiddleware(["users.login"]));
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes)

const startServer = async () => {
  try {
    await dbConn();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

app.use(function handleError(err, _req, res, _next) {
  if (err instanceof ErrorCodes) {
    return res
      .status(err.errorCode)
      .json({ error: err.message, exceptionType: err.type });
  }
  return res.status(500).json({ error: err.message });
});

startServer();
