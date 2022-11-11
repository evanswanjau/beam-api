/**
 * A function that generates a random string
 * @param type "The string type you want to receive (letters || numbers)"
 * @param length "The length of random string you want returned"
 * @returns random string
 */
export const generateRandomString = (type = "", length: number) => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomString = "";

    if (type == "letters") {
        str = str.substring(0, 26);
    } else if (type == "numbers") {
        str = "0123456789";
    }

    for (let i = 0; i < length; i++) {
        randomString += str.charAt(Math.floor(Math.random() * str.length));
    }

    return randomString;
};
