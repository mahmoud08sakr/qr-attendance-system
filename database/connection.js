import { connect } from "mongoose";
const connectDB = async () => {

    await connect(process.env.MONGO_URI).then(() => {
        console.log("MongoDB connected");

    }).catch((error) => {
        console.log(error);
    })


}

export default connectDB;
