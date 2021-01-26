import * as dotenv from "dotenv";

dotenv.config();
let path;
switch (process.env.NODE_ENV) {
    case "production":
        path = `${__dirname}/../.env`;
        break;
    default:
        path = `${__dirname}/../.env.development`;
}
dotenv.config({ path: path });

export const ID = process.env.ID;
export const TOKEN = process.env.TOKEN;
