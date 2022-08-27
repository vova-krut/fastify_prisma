import { FastifyInstance } from "fastify";
import userController from "./user.controller";
import { $ref } from "./user.schema";

async function userRoutes(server: FastifyInstance) {
    server.post(
        "/",
        {
            schema: {
                body: $ref("createUserSchema"),
                response: {
                    201: $ref("createUserResponseSchema"),
                },
            },
        },
        userController.createUserHandler
    );

    server.post(
        "/login",
        {
            schema: {
                body: $ref("loginSchema"),
                response: {
                    200: $ref("loginResponseSchema"),
                },
            },
        },
        userController.loginHandler
    );
}

export default userRoutes;
