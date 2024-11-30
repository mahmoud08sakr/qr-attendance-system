import { Schema } from "mongoose";


const accountSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})

const accountModel = model("Account", accountSchema);
export default accountModel