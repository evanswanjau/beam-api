import fastify from "fastify";
import { uploadViaUrl } from "./helpers/images";

const server = fastify();

server.get("/", async () => {
    return { hello: "world" };
});

server.post("/upload/", async (req: any, res) => {
    try {
        res.send(await uploadViaUrl(req.body.url));
    } catch (error) {
        res.send(error);
    }
});

server.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
