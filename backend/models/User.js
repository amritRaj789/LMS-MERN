import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    address: {
        type: String
    }

}, {timestamps: true});

userSchema.pre("save", async function(){
    if(!this.isModified("password")){
       return; // if password is not modified, we can skip hashing
    }
    // if new password or modified password, use bcrypt for hashing
    const salt = await bcrypt.genSalt(10) // 10 is the default saltrounds
    this.password = await bcrypt.hash(this.password, salt); // this stores the hash of a password in our DB
})

// writing a custom method that is used to check if password matches
userSchema.methods.matchPassword =  async function (enteredPassword){
    //console.log("Inside matchPassword");
    return await bcrypt.compare(enteredPassword, this.password); // bcrypt internally hashes the entered password to compare with stored
}

const User = mongoose.model("User", userSchema);

export default User;