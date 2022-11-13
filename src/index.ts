import fastify from "fastify";
import { colorizeAILab } from "./helpers/colorize";
import { uploadUrl, uploadBase64, secureEndpoint } from "./helpers/imagekit";

const server = fastify();

server.get("/", async () => {
    return { hello: "world" };
});

server.post("/upload/", async (req: any, res) => {
    try {
        const old = await uploadUrl(req.body.url);
        const colorizedBase64 = await colorizeAILab(req.body.url);
        const colorized = await uploadBase64(colorizedBase64.data.image);

        res.send({ old: old.url, colorized: colorized.url });
    } catch (error: any) {
        res.status(error.response.status).send(error.response.data);
    }
});

server.get("/imagekit/auth/", async (req: any, res) => {
    return secureEndpoint();
});

const port = parseInt(process.env.PORT || "5000");
server.listen({ port: port }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address} 🚀`);
});
