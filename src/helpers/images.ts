import ImageKit from "imagekit";
import dotenv from "dotenv";
import { generateRandomString } from "./string";
dotenv.config();

const imagekit = new ImageKit({
    publicKey: process.env.IK_PUBLIC_KEY || "",
    privateKey: process.env.IK_PRIVATE_KEY || "",
    urlEndpoint: process.env.IK_URL || "",
});

export const uploadViaUrl = (url: string) => {
    const fileName = generateRandomString("letters", 10).toLocaleLowerCase();
    return imagekit.upload({
        file: url,
        folder: "old",
        fileName: fileName + ".jpg",
    });
};
