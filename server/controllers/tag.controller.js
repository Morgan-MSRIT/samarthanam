const Tag = require('../models/tag.models');

exports.createTag = async (req, res) => {
    try {
        const { name } = req.body;

        if(!name) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const tag = await Tag.create({ name });

        const tags = await Tag.find();

        return res.status(200).json({
            success: true,
            message: "Tag created successfully",
            data: tags
        })
    }
    catch (error) {
        console.log("Error occured while creating tag", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


exports.getTags = async (req, res) => {
    try {
        const tags = await Tag.find();

        return res.status(200).json({
            success: true,
            data: tags
        })
    }
    catch (error) {
        console.log("Error occured while fetching tags", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

