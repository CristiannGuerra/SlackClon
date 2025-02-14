import mongoose from "mongoose"
import ENVIRONMENT from "./enviroment.config.js"

const connectToMongoDB = async () => {
    try {
        const response = await mongoose.connect(ENVIRONMENT.MONGO_DB_URL)
        console.log("Connected to MongoDB")

    } catch (error) {
        console.log(`Error connecting to MongoDB\n ${error}`)
    }


}

connectToMongoDB()

export default mongoose

