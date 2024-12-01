import { model, Schema } from "mongoose";


const accountSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
})

const accountModel = model("Account", accountSchema);
export default accountModel