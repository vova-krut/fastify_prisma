import { CreateUserInput } from "./user.schema";
import prisma from "../../utils/prisma";
import { hashPassword } from "../../utils/hash";

class UserService {
    async createUser(input: CreateUserInput) {
        const { password, ...rest } = input;
        const { hash, salt } = hashPassword(password);

        const user = await prisma.user.create({
            data: { ...rest, salt, password: hash },
        });

        return user;
    }

    async findUserByEmail(email: string) {
        return prisma.user.findUnique({ where: { email } });
    }
}

export default new UserService();
