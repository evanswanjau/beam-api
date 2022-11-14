import fastify from "fastify";
import cors from "@fastify/cors";
import { colorizeAILab } from "./helpers/colorize";
import { uploadUrl, uploadBase64, secureEndpoint } from "./helpers/imagekit";

const server = fastify();

server.register(cors, {
    hook: "preHandler",
    delegator: (req, callback) => {
        const corsOptions = {
            origin: true,
        };

        if (/^localhost$/m.test(req.headers.origin || "")) {
            corsOptions.origin = false;
        }

        callback(null, corsOptions);
    },
});

server.get("/", async () => {
    return { hello: "world" };
});

server.post("/upload/", (req: any, res) => {
    try {
        colorizeAILab(req.body.url)
            .then((response) => {
                return uploadBase64(response.data.image, req.body.fileName);
            })
            .then((data) => {
                res.send({ colorized: data.url });
            })
            .catch((error) => {
                res.send(error.message);
            });
    } catch (error: any) {
        res.send(error.response.data);
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
