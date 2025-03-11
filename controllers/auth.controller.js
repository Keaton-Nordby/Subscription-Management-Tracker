import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from '../models/user.model.js';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env.js';

export const signUp = async (req, res, next) => {
    const session = await  mongoose.startSession();
    session.startTransaction();

    try {
        // below is a atomic way of letting users sign up, it either all works or all doesn't based off industry standards
        // here is the logic I used to create a new user
        const {name, email, password} = req.body;

        // check to see if the user already exists
        const existingUser = await User.findOne({email});
        
        if (existingUser) {
            const error = new Error('User already exists');
            error.statusCode = 409;
            throw error;
        }

        // if not we will hash the password to keep it secure
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // using a session in case something goes wrong while in the process of creating a user
        const newUsers = await User.create([{name, email, password: hashedPassword}], { session });
        const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                token, 
                user: newUsers[0],
            }
        })
    } catch(error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }

}

export const signIn = async (req, res, next) => { }

export const signOut = async (req, res, next) => {}
