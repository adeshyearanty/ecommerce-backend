import express from "express";
import { PORT } from "./config/config.js";
import dbConn from "./db/db-conn.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import checkoutRoutes from "./routes/checkoutRoutes.js";
import { ErrorCodes } from "./utils/errorCodes.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import { specs } from "./utils/swagger.js";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  authMiddleware([
    "users.login",
    "users.forgotPassword",
    "users.changeForgotPassword",
    "api-docs.*",
  ])
);
app.get("/", (req, res) => {
  res.send("Hello, Swagger!");
});
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/wishlist", wishlistRoutes);
app.use("/checkout", checkoutRoutes);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

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
