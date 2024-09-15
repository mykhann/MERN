import { User } from "../../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import UploadOnCloudinary from "../utils/cloudinary.js";
import "dotenv/config"

// Register user
export const register = async (req, res) => {
    try {
        const { fullname, email, password, phoneNumber, role } = req.body;

        // Check if required fields are present
        if (!fullname || !email || !password || !phoneNumber || !role) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        // Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exists",
                success: false
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Upload avatar to Cloudinary
        const avatarlocalPath = req.file ? req.file.path : null;
        if (!avatarlocalPath) {
            return res.status(400).json({
                success: false,
                message: "Avatar file not found"
            });
        }

        const avatar = await UploadOnCloudinary(avatarlocalPath);
        if (!avatar) {
            return res.status(400).json({
                success: false,
                message: "Something went wrong during avatar upload"
            });
        }

        // Create user
        await User.create({
            fullname,
            email,
            password: hashedPassword,
            phoneNumber,
            role,
            profile: {
                profilePhoto: avatar.url
            }
        });

        return res.status(200).json({
            message: "Account created successfully",
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

// Login user
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        // Find user by email
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Incorrect Email",
                success: false
            });
        }

        // Check password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Incorrect Password",
                success: false
            });
        }

        // Check if role matches
        if (role !== user.role) {
            return res.status(401).json({
                message: "Account doesn't exist with current role",
                success: false
            });
        }

        // Generate token
        const tokenData = { userId: user._id };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        // Return user data and token
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200)
            .cookie("token", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, secure: true ,sameSite: 'strict'})
            .json({
                message: `Welcome back, ${user.fullname}`,
                user,
                success: true,
                token
            });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

// Logout user
export const Logout = async (req, res) => {
    try {
        return res.status(200)
            .cookie("token", "", { maxAge: 0 })
            .json({
                message: "Logged out successfully",
                success: true
            });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

// Update profile
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;
        const avatarlocalpath = file ? file.path : null;

        // ===================================================================================================
        // Ensure userId is present
        const userId = req.id; // Middleware should add this
        if (!userId) {
            return res.status(401).json({
                message: "Not authenticated",
                success: false
            });
        }

        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }
        // ===================================================================================================

        // Handle file upload to Cloudinary
        if (file) {
            const resume = await UploadOnCloudinary(avatarlocalpath);  // Ensure this function is defined and handles uploads
            if (resume) {
                user.profile.resume = resume.secure_url;
                // Set resume URL after successful upload
                user.profile.resumeOriginalName = file.originalname; 

            }
        }

        // Update user fields
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skills.split(",");

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        };

        return res.status(200).json({
            message: "Profile updated successfully",
            user,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

