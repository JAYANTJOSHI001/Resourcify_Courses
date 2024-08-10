import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    name:{type: String},
    description:{type: String},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: true},
    role:{type: String, required:true},
    avatar:{type: String, default:'#'},
    enrolledCourses: [{ type: String }],
    myCourses: [{ type: String }],
    completedChapter: [{ type : String}],
    completedCourses: [{ type : String}],
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date }
})

const UserModel = mongoose.model("User", UserSchema)

export {UserModel as User}