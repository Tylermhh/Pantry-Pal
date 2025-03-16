import express, { Request, Response } from "express";
import { MongoClient } from "mongodb";
import { DataProvider } from "../DataProvider";
import {handleImageFileErrors, imageMiddlewareFactory} from "../imageUploadMiddleware";

export function registerDataRoutes(app: express.Application, mongoClient: MongoClient) {

    app.get("/api/data", (req: Request, res: Response) => {
        const imgProvider = new DataProvider(mongoClient);
        let userId: string | undefined = undefined;
        if (typeof req.query.user === "string") {
            userId = req.query.user;
        }

        const images = imgProvider.getAllPantryGroups(userId);

        images.then((images) => {
            return res.json(images);
        }).catch((err) => {
            console.error("Error fetching images:", err);
            res.status(500).json({ error: "Internal server error" });
            return;
        })
    })

    app.patch("/api/data/:userId", (req: Request, res: Response) => {
        const userId = req.params.userId;
        const { newPantryGroups } = req.body;
        if (!newPantryGroups) {
            res.status(400).send({
                error: "Bad request",
                message: "Missing new pantry groups"
            });
        }

        const dataProvider = new DataProvider(mongoClient);

        const matchedCount = dataProvider.updateUserPantry(userId, newPantryGroups);

        matchedCount.then((matchedCount) => {
            if (matchedCount == 0) {
                res.status(404).send({
                    error: "Not found",
                    message: "User not found"
                });
                return
            }
        })

        // console.log(`User ID: ${userId}, New Data: ${newPantryGroups}`);
    })

    app.post("/api/data/:userId", async (req: Request, res: Response) => {
        try {
            const userId = req.params.userId;
            const { username } = req.body;

            // Validate required fields
            if (!username) {
                res.status(400).json({
                    error: "Bad request",
                    message: "Missing required field: username"
                });
            }

            const dataProvider = new DataProvider(mongoClient);

            // Check if user already exists
            const existingUser = await dataProvider.getAllPantryGroups(userId);
            if (existingUser) {
                res.status(409).json({
                    error: "Conflict",
                    message: "User data already exists"
                });
            }

            // Create new user data
            const insertedId = await dataProvider.createNewUserData(userId, username);

            res.status(201).json({
                message: "User data created successfully",
                userId: insertedId
            });
        } catch (err) {
            console.error("Error creating user data:", err);
            res.status(500).json({
                error: "Internal server error",
                message: (err as Error).message
            });
        }
    })

    app.post(
        "/api/images/:userId",
        imageMiddlewareFactory.single("image"),
        handleImageFileErrors,
        async (req: Request, res: Response) => {
            // Final handler function after the above two middleware functions finish running
            const file = req.file;
            const userId = req.params.userId;
            const groupId = req.query.groupId?.toString();
            // const user = res.locals.token;
            // const userId = user?._id;


            if (!file) {
                res.status(400).send({
                    error: "Bad request",
                    message: "Missing file"
                })
                return;
            }

            if (!userId || !groupId) {
                res.status(500).send({
                    error: "Internal server error",
                    message: "No userId or groupId."
                })
                return;
            }

            const newImageSrc = `/uploads/${file.filename}` ;



            const dataProvider = new DataProvider(mongoClient);

            try {
                const result = await dataProvider.updateImage(newImageSrc, userId, groupId);

                if (result.success) {
                    console.log("createImage call success. sending 201 with success message");
                    res.status(201).send({ message: result.message });
                    return;
                } else {
                    console.log("createImage call failed. sending 402 with error message");
                    res.status(500).send({ message: result.message });
                    return;
                }
            } catch (err) {
                console.error("Unexpected error in createImage:", err);
                res.status(500).json({ error: "Internal server error", message: "An unexpected error occurred." });
                return;
            }
        }
    )
}