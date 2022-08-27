import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import userRoutes from "./modules/user/user.routes";
import { userSchemas } from "./modules/user/user.schema";
import fjwt from "@fastify/jwt";
import dotenv from "dotenv";
dotenv.config();

export const server = Fastify();
const PORT = Number(process.env.PORT) || 5000;

server.register(fjwt, {
    secret: "d3k21n3k21n3j12neoiwqnidsadas1j12i31",
});

server.decorate(
    "authenticate",
    async (req: FastifyRequest, res: FastifyReply) => {
        try {
            await req.jwtVerify();
        } catch (e) {
            return res.send(e);
        }
    }
);

server.get("/healthcheck", async () => {
    return { status: "OK" };
});

async function main() {
    for (const schema of userSchemas) {
        server.addSchema(schema);
    }
    server.register(userRoutes, { prefix: "api/users" });

    try {
        await server.listen({
            port: PORT,
            host: "0.0.0.0",
        });
        console.log(`Server started on port ${PORT}`);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

main();
