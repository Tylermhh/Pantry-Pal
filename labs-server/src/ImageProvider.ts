import { MongoClient, ObjectId } from "mongodb";

export interface Item {
    id: string;
    name: string;
    count: number;
}

// Define the interface for each pantry group
export interface PantryGroup {
    id: string;
    category: string;
    items: Item[];  // Use the Item interface here
    imageURL: string;
}

interface DataDocument {
    _id: string;
    username: string;
    data: PantryGroup;
}

interface UserDocument {
    _id: string;
    username: string;
}

export class ImageProvider {
    constructor(private readonly mongoClient: MongoClient) {}

    async getAllPantryGroups(userId?: string): Promise<DataDocument[]> {
        const dataCollectionName = process.env.DATA_COLLECTION_NAME;
        const usersCollectionName = process.env.USERS_COLLECTION_NAME;
        if (!dataCollectionName || !usersCollectionName) {
            throw new Error("Missing DATA_COLLECTION_NAME or USERS_COLLECTION_NAME from environment variables");
        }

        const collection = this.mongoClient.db().collection<DataDocument>(dataCollectionName);

        return collection.find().toArray();
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

}