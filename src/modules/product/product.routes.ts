import { FastifyInstance } from "fastify";
import productController from "./product.controller";
import { $ref } from "./product.schema";

async function productRoutes(server: FastifyInstance) {
    server.post(
        "/",
        {
            preHandler: [server.authenticate],
            schema: {
                body: $ref("createProductSchema"),
                response: {
                    201: $ref("productResponseSchema"),
                },
            },
        },
        productController.createProductHandler
    );

    server.get(
        "/",
        {
            preHandler: [server.authenticate],
            schema: {
                response: {
                    200: $ref("productsResponseSchema"),
                },
            },
        },
        productController.getProductsHandler
    );

    server.get(
        "/:id",
        {
            preHandler: [server.authenticate],
            schema: {
                response: {
                    200: $ref("productResponseSchema"),
                },
            },
        },
        productController.getProductHandler
    );
}

export default productRoutes;
