import express from "express";
import multer from "multer";
import ProductService from "../services/productService.js";
import { handleResponse, compileMiddlewares } from "../utils/utils.js";
import {
  validateProductInput,
  checkProductExists,
} from "../middlewares/productMiddleware.js";
import { userRoleMiddleware } from "../middlewares/userRoleMiddleware.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get("/", handleResponse(ProductService.getAllProducts));
router.post(
  "/",
  userRoleMiddleware("admin"),
  compileMiddlewares(validateProductInput),
  handleResponse(ProductService.createProduct)
);
router.get(
  "/:id",
  compileMiddlewares(checkProductExists),
  handleResponse(ProductService.getSingleProduct)
);
router.put(
  "/:id",
  userRoleMiddleware("admin"),
  compileMiddlewares(checkProductExists),
  handleResponse(ProductService.updateProduct)
);
router.delete(
  "/:id",
  userRoleMiddleware("admin"),
  compileMiddlewares(checkProductExists),
  handleResponse(ProductService.deleteProduct)
);

export default router;
