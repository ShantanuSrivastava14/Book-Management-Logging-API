import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        //unique: true,
    },
    password: {
        type: String,
        select: true,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")){
        return next();
    }
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch(error){
        return next(error);
    }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

const userModel = mongoose.model("user", userSchema);
export default userModel;