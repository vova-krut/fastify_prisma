import Fastify from "fastify";
import dotenv from "dotenv";
dotenv.config();

const server = Fastify();
const PORT = Number(process.env.PORT) || 5000;

async function main() {
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
