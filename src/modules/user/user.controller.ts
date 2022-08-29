import { CreateUserInput, LoginInput } from "./user.schema";
import { FastifyRequest, FastifyReply } from "fastify";
import userService from "./user.service";
import { verifyPassword } from "../../utils/hash";

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

    async loginHandler(
        req: FastifyRequest<{ Body: LoginInput }>,
        res: FastifyReply
    ) {
        const body = req.body;
        const user = await userService.findUserByEmail(body.email);
        if (!user) {
            res.code(401).send({ message: "Invalid email or password" });
        }
        const correctPassword = verifyPassword({
            candidatePassword: body.password,
            salt: user!.salt,
            hash: user!.password,
        });
        if (correctPassword) {
            const { password, salt, ...rest } = user!;
            return { accessToken: req.jwt.sign(rest) };
        }
        return res.code(401).send({ message: "Invalid email or password" });
    }

    async getUsersHandler(req: FastifyRequest, res: FastifyReply) {
        const users = await userService.findUsers();
        return users;
    }
}

export default new UserController();
