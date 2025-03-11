import express, { Request, Response } from "express";
import { MongoClient } from "mongodb";
import { DataProvider } from "../DataProvider";

export function registerDataRoutes(app: express.Application, mongoClient: MongoClient) {

    app.get("/api/data", (req: Request, res: Response) => {
        const imgProvider = new DataProvider(mongoClient);
        let userId: string | undefined = undefined;
        if (typeof req.query.user === "string") {
            userId = req.query.user;
        }
        console.log(`/api/data query param: ${userId}`);

        const images = imgProvider.getAllPantryGroups(userId);

        images.then((images) => {
            return res.json(images);
        }).catch((err) => {
            console.error("Error fetching images:", err);
            res.status(500).json({ error: "Internal server error" });
        })
    })

    app.patch("/api/data/:userId", (req: Request, res: Response) => {
        console.log(`/api/data query param: ${req.params.userId}`);
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
            }
        })

        console.log(`User ID: ${userId}, New Data: ${newPantryGroups}`);
    })
}