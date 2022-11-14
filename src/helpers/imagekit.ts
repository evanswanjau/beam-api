import ImageKit from "imagekit";
import dotenv from "dotenv";
import { generateRandomString } from "./string";

dotenv.config();

const imagekit = new ImageKit({
    publicKey: process.env.IK_PUBLIC_KEY || "",
    privateKey: process.env.IK_PRIVATE_KEY || "",
    urlEndpoint: process.env.IK_URL || "",
});

/**
 * Function that uploads image to imagekit server
 * via url
 * @param url
 * @returns upload response
 */
export const uploadUrl = (url: string) => {
    const fileName = generateRandomString("letters", 10).toLocaleLowerCase();
    return imagekit.upload({
        file: url,
        folder: "old",
        fileName: fileName + ".jpg",
    });
};

/**
 * Function that uploads base64 image to imagekit server
 * via base64 data
 * @param url
 * @returns upload response
 */
export const uploadBase64 = (base64Img: any, fileName: string) => {
    return imagekit.upload({
        file: base64Img,
        folder: "colorized",
        fileName: fileName,
    });
};

/**
 * This function provides authentication for frontend
 * uploads
 * @returns credentials
 */
export const secureEndpoint = () => {
    return imagekit.getAuthenticationParameters();
};
