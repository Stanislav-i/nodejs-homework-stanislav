import { Schema, model } from "mongoose";
import Joi from "joi";

import { handleSaveError, runValidateAtUpdate } from "./hooks.js";

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    // section: {
    //     type: String,
    //     enum: ["Family", "Work", "Other"],
    //     required: true,
    // },
    // dateAdded: {
    //     type: String,
    //     match: /^\d{4}$/,
    //     required: true,

    // }
}, {versionKey: false, timestamps: true});

contactSchema.post("save", handleSaveError);

contactSchema.pre("findOneAndUpdate", runValidateAtUpdate);

contactSchema.post("findOneAndUpdate", handleSaveError);

export const contactAddSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
  });

export const contactUpdateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required().messages({
        "any.required": `missing field favorite`
    }),
})

const Contact = model("contact", contactSchema);
 
export default Contact;