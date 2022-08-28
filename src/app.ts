import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import userRoutes from "./modules/user/user.routes";
import { userSchemas } from "./modules/user/user.schema";
import { productSchemas } from "./modules/product/product.schema";
import fjwt from "@fastify/jwt";
import swagger from "@fastify/swagger";
import { withRefResolver } from "fastify-zod";
import { version } from "../package.json";
import productRoutes from "./modules/product/product.routes";
import dotenv from "dotenv";
dotenv.config();

export const server = Fastify();
const PORT = Number(process.env.PORT) || 5000;

declare module "fastify" {
    export interface FastifyInstance {
        authenticate: any;
    }
}

declare module "@fastify/jwt" {
    interface FastifyJWT {
        user: {
            id: number;
            email: string;
            name: string;
        };
    }
}

server.register(fjwt, {
    secret: "d3k21n3k21n3j12neoiwqnidsadas1j12i31",
});

server.register(
    swagger,
    withRefResolver({
        routePrefix: "/docs",
        exposeRoute: true,
        staticCSP: true,
        openapi: {
            info: {
                title: "Fastify API",
                description: "API for some products",
                version,
            },
        },
    })
);

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
    for (const schema of [...userSchemas, ...productSchemas]) {
        server.addSchema(schema);
    }
    server.register(userRoutes, { prefix: "api/users" });
    server.register(productRoutes, { prefix: "api/products" });

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
