import express, { Request, Response } from "express";
import dotenv from "dotenv";
import * as path from "node:path";
import { MongoClient } from "mongodb";
import {DataProvider} from "./DataProvider";
import { ObjectId } from "mongodb";
import {registerDataRoutes} from "./routes/data";
import {registerAuthRoutes, verifyAuthToken} from "./routes/auth";

dotenv.config(); // Read the .env file in the current working directory, and load values into process.env.
const PORT = process.env.PORT || 3000;
const staticDir = process.env.STATIC_DIR || "public";


async function setUpServer() {
    const { MONGO_USER, MONGO_PWD, MONGO_CLUSTER, DB_NAME, IMAGE_UPLOAD_DIR } = process.env;

    if (!IMAGE_UPLOAD_DIR) {
        throw new Error(`IMAGE_UPLOAD_DIR doesn't exist in .env file`);
    }

    const connectionStringRedacted = `mongodb+srv://${MONGO_USER}:<password>@${MONGO_CLUSTER}/${DB_NAME}`;
    const connectionString = `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_CLUSTER}/${DB_NAME}`;

    console.log("Attempting Mongo connection at " + connectionStringRedacted);

    const mongoClient = await MongoClient.connect(connectionString);

    const collectionInfos = await mongoClient.db().listCollections().toArray();
    console.log(collectionInfos.map(collectionInfo => collectionInfo.name)); // For debug only


    const app = express();
    app.use(express.static(staticDir));
    app.use("/uploads", express.static(IMAGE_UPLOAD_DIR))
    app.use(express.json());
    app.use("/api/*", verifyAuthToken);

    app.get("/hello", (req: Request, res: Response) => {
        res.send("Hello, World");
    });

    registerAuthRoutes(app, mongoClient);
    registerDataRoutes(app, mongoClient);

    app.get("*", (req: Request, res: Response) => {
        res.sendFile("index.html", {root: staticDir});
    });

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

setUpServer();



