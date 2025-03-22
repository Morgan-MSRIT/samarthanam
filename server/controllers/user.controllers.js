const User = require('../models/user.models');
const Event = require('../models/event.models');
const bcrypt=require('bcrypt');


exports.updateUser = async (req, res) => {
    try {
        const {_id, name, age, email, phone, address, nationality, emailNotifAllow, password, role, tags } = req.body;

        if(!_id || !name || !age || !email || !phone || !address || !nationality || !emailNotifAllow || !password || !role || !tags) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const user = await User.findById(_id);

        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        const passowrdCheck = await bcrypt.compare(password,user.password);
        if(!passowrdCheck) {
            return res.status(400).json({
                success: false,
                message: "Invalid password"
            })
        }

        const updatedUser = await User.findByIdAndUpdate(
            _id, 
            { name, age, email, phone, address, nationality, emailNotifAllow, role, tags }, 
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "User updated",
            data: user
        })
    }
    catch (error) {
        console.log("Error occured while updating user", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


exports.getUserEvents = async (req, res) => {
    try {
        const { userId } = req.body;
        const events = await Event.find({ user: userId });

        return res.status(200).json({
            success: true,
            data: events
        })
    }
    catch (error) {
        console.log("Error occured while fetching user events", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

