import { CreateUserInput } from "./user.schema";
import { FastifyRequest, FastifyReply } from "fastify";
import userService from "./user.service";

class UserController {
    async createUserHandler(
        req: FastifyRequest<{ Body: CreateUserInput }>,
        res: FastifyReply
    ) {
        const body = req.body;
        try {
            const user = await userService.createUser(body);
            return res.code(201).send(user);
        } catch (e) {
            return res.code(500).send(e);
        }
    }
}

export default new UserController();
