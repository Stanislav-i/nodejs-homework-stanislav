import User from "../models/User.js";

import { HttpError } from "../helpers/index.js";

import { ctrlWrapper } from "../decorators/index.js";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

const  {JWT_SECRET} = process.env;

const signup = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user) {
        throw HttpError(409, "This email already exists")
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({...req.body, password: hashPassword});

    res.status(201).json({
        user: {
        username: newUser.username,
        email: newUser.email,
        subscription: newUser.subscription,
        }
    })
}

const signin = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        throw HttpError(401, "Email or password invalid");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
        throw HttpError(401, "Email or password invalid");
    }
    
    const {_id: id} = user;

    const payload = {
        id,
    };

    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "23h"});
    await User.findByIdAndUpdate(id, {token});

    res.json({
        token,
        user: {
            username: user.username,
            email: user.email,
            subscription: user.subscription,
            }
    })
}

const getCurrent = (req, res) => {
    const {name, email} = req.user;

    res.json({
        name, 
        email,
    })
}

const signout = async(req, res) => {
    const {_id} = req.user;
    await User.findByIdAndUpdate(_id, {token: ""});

    res.json({
        message: "Signout success"
    })
}

export default {
    signup:ctrlWrapper(signup),
    signin:ctrlWrapper(signin),
    getCurrent: ctrlWrapper(getCurrent),
    signout: ctrlWrapper(signout),
}