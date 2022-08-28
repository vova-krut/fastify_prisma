import { CreateProductInput } from "./product.schema";
import { FastifyReply } from "fastify";
import { FastifyRequest } from "fastify";
import productService from "./product.service";

class ProductController {
    async createProductHandler(
        req: FastifyRequest<{ Body: CreateProductInput }>,
        res: FastifyReply
    ) {
        const product = await productService.createProduct({
            ...req.body,
            ownerId: req.user.id,
        });
        return product;
    }

    async getProductsHandler(req: FastifyRequest, res: FastifyReply) {
        const products = await productService.getProducts();
        return products;
    }

    async getProductHandler(
        req: FastifyRequest<{ Params: { id: number } }>,
        res: FastifyReply
    ) {
        const id = Number(req.params.id);
        const product = await productService.getProductById(id);
        return product;
    }
}

export default new ProductController();
