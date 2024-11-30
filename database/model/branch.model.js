import { Schema } from "mongoose";
const branchSchema = new Schema({
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
})
const branchModel = model("Branch", branchSchema);
export default branchModel