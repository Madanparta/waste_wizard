import mongoose from 'mongoose';

const dbConnection = async()=>{
    try {
        const request = await mongoose.connect(process.env.MONGOOSE_URL);
        console.log(`MongoDB Connected : ${request.connection.host}`);
    } catch (error) {
        console.log(`Error : ${error.message}`)
        process.exit(1)
    }
}

export default dbConnection;