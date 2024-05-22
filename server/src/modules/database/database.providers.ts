import * as mongoose from "mongoose";

export const databaseProvides = [
    {
        provide: "DATABASE_CONNECTION",
        useFactory: (): Promise<typeof mongoose> => 
            mongoose.connect("mongodb://localhost:27017/chat_app")
    }
]