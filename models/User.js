import { Schema, model } from "mongoose";
import Joi from "joi";

import { handleSaveError, runValidateAtUpdate } from "./hooks.js";

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        match: emailRegexp,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minlength: 5,
        required: true,
    },
    avatarURL: {
        type: String,
        required:true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: {
        type: String,
        default: null,
    }
}, {versionKey: false, timestamps: true})

userSchema.post("save", handleSaveError);

userSchema.pre("findOneAndUpdate", runValidateAtUpdate);

userSchema.post("findOneAndUpdate", handleSaveError);

export const userSignupSchema = Joi.object({
    username: Joi.string().required().messages({
        "any.required": `missing field Username`
    }),
    email: Joi.string().pattern(emailRegexp).required().messages({
        "any.required": `missing field Email`
    }),
    password: Joi.string().min(5).required().messages({
        "any.required": `missing field Passord`
    }),
});

export const userSigninSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required().messages({
        "any.required": `missing field Email`
    }),
    password: Joi.string().min(5).required().messages({
        "any.required": `missing field Passord`
    }),
});

const User = model("user", userSchema);

export default User;