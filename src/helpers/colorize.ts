import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

export const colorizeAILab = (url: string) => {
    try {
        const encodedParams = new URLSearchParams();
        encodedParams.append("url", url);

        return axios.request({
            method: "POST",
            url: process.env.RAPID_URL,
            headers: {
                "content-type": "application/x-www-form-urlencoded",
                "X-RapidAPI-Key": process.env.RAPID_KEY,
                "X-RapidAPI-Host": process.env.RAPID_HOST,
            },
            data: encodedParams,
        });
    } catch (error: any) {
        throw new Error(error.message);
    }
};
