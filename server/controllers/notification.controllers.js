const Notification = require('../models/notification.models');

exports.getNotifications = async (req, res) => {
    try {
        const { userId } = req.params;
        const notifications = await Notification.find({ user: userId }).populate('event').populate('task');

        if(!notifications) {
            return res.status(404).json({
                success: false,
                message: "No notifications found"
            });
        }

        return res.status(200).json({
            success: true,
            data: notifications
        });

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}