import { MongoClient, ObjectId } from "mongodb";

export interface Item {
    _id: string;
    name: string;
    count: number;
}

// Define the interface for each pantry group
export interface PantryGroupType {
    _id: string;
    category: string;
    items: Item[];  // Use the Item interface here
    imageURL: string;
}

interface DataDocument {
    _id: string;
    username: string;
    data: PantryGroupType[];
}

interface UserDocument {
    _id: string;
    username: string;
}

export class DataProvider {
    constructor(private readonly mongoClient: MongoClient) {}

    async getAllPantryGroups(userId?: string): Promise<DataDocument[] | DataDocument | null> {
        const dataCollectionName = process.env.DATA_COLLECTION_NAME;
        const usersLoginCollectionName = process.env.USERS_LOGIN_COLLECTION_NAME;
        if (!dataCollectionName || !usersLoginCollectionName) {
            throw new Error("Missing DATA_COLLECTION_NAME or USERS_COLLECTION_NAME from environment variables");
        }

        const collection = this.mongoClient.db().collection<DataDocument>(dataCollectionName);

        if (userId) {
            // If userId is provided, return a single document
            return collection.findOne({ _id: userId });
        }

        // Otherwise, return an array of all documents
        return collection.find({}).toArray();
    }

    // async updateImageName(imageId: string, newName: string): Promise<number> {
    //     const collectionName = process.env.IMAGES_COLLECTION_NAME;
    //     if (!collectionName) {
    //         throw new Error("Missing IMAGES_COLLECTION_NAME from environment variables");
    //     }
    //
    //     const collection = this.mongoClient.db().collection<DataDocument>(collectionName);
    //     const result = await collection.updateOne(
    //         {_id: imageId},
    //         {$set: {name: newName}}
    //     );
    //
    //     return result.matchedCount;
    // }

    async updateUserPantry(userId: string, newPantryGroups: PantryGroupType[]): Promise<number> {
        const collectionName = process.env.DATA_COLLECTION_NAME;
        if (!collectionName) {
            throw new Error("Missing DATA_COLLECTION_NAME from environment variables");
        }

        const collection = this.mongoClient.db().collection<DataDocument>(collectionName);
        const result = await collection.updateOne(
            { _id: userId },
            { $set: { data: newPantryGroups } },
        );

        return result.matchedCount;
    }

    async createNewUserData(userId: string, username: string): Promise<string> {
        const dataCollectionName = process.env.DATA_COLLECTION_NAME;
        if (!dataCollectionName) {
            throw new Error("Missing DATA_COLLECTION_NAME from environment variables");
        }

        // Create the new user document
        const newUserData: DataDocument = {
            _id: userId,
            username: username,
            data: []
        };

        const collection = this.mongoClient.db().collection<DataDocument>(dataCollectionName);
        const result = await collection.insertOne(newUserData as any); // Casting needed due to schema mismatch

        return result.insertedId.toString();
    }

    async updateImage(newImageSrc: string, userId: string, groupId: string) {
        const collectionName = process.env.DATA_COLLECTION_NAME;
        if (!collectionName) {
            throw new Error("Missing IMAGES_COLLECTION_NAME from environment variables");
        }

        const collection = this.mongoClient.db().collection<DataDocument>(collectionName);

        try {
            const result = await collection.updateOne(
                { _id: userId, "data.id": groupId }, // Match document with userId and correct groupId
                { $set: { "data.$[elem].imageURL": newImageSrc } }, // Use array filter to update the right object
                { arrayFilters: [{ "elem.id": groupId }] } // Define array filter
            );


            if (result.modifiedCount === 0) {
                return { success: false, message: "No document updated. Ensure userId and groupId are correct." };
            }

            return { success: true, message: "Image URL updated successfully" };
        } catch (error) {
            console.error("Error updating imageURL:", error);
            return { success: false, message: "Database operation failed" };
        }
    }

}