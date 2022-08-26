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
}

export default userRoutes;
