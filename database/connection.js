import { connect } from "mongoose";

const connectDB = async () => {
    console.log(process.env.MONGO_URI); 
    try {
        await connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

export default connectDB;
