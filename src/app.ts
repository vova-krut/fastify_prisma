import dotenv from "dotenv";
import buildServer from "./server";
dotenv.config();

const server = buildServer();
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
