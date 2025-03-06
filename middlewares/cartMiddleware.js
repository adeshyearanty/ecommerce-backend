import Product from '../models/ProductModel.js'
import { BadRequestException } from '../utils/errorCodes.js';

export const checkProductQuantity = async (body, _res, _next, _params, _req) => {
    const { productId, quantity } = body
    const product = await Product.findOne({ _id: productId });
    if (product.quantity < quantity) {
        throw new BadRequestException(`The enough quantity, available quantity : ${product.quantity}`)
    }
}
