import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import userRoutes from "./modules/user/user.routes";
import { userSchemas } from "./modules/user/user.schema";
import { productSchemas } from "./modules/product/product.schema";
import fjwt, { JWT } from "@fastify/jwt";
import swagger from "@fastify/swagger";
import { withRefResolver } from "fastify-zod";
import { version } from "../package.json";
import productRoutes from "./modules/product/product.routes";
import dotenv from "dotenv";
dotenv.config();

declare module "fastify" {
    interface FastifyRequest {
        jwt: JWT;
    }
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

function buildServer() {
    const server = Fastify();

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

    server.addHook("preHandler", (req, res, next) => {
        req.jwt = server.jwt;
        return next();
    });

    for (const schema of [...userSchemas, ...productSchemas]) {
        server.addSchema(schema);
    }
    server.register(userRoutes, { prefix: "api/users" });
    server.register(productRoutes, { prefix: "api/products" });

    return server;
}

export default buildServer;
