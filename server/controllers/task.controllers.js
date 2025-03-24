const Task = require('../models/task.models');
const Event = require('../models/event.models');
const Volunteer = require('../models/volunteer.models');

exports.createTask = async (req, res) => {
    try {
        const { name, startTime, endTime, currentVolunteerCount, maxVolunteerNeeded } = req.body;
        if (!name || !startTime || !endTime || !currentVolunteerCount || !maxVolunteerNeeded) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
    
        const task = await Task.create({
            name,
            startTime,
            endTime,
            currentVolunteerCount,
            maxVolunteerNeeded
        });
    
        return res.status(200).json({
            success: true,
            message: "Task created successfully",
            data: task
        })
    } catch (error) {
        console.log("Error occured while creating task", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


exports.getTasks = async (req, res) => {
    try {
        const {event} = req.body;
        if (!event) {
            return res.status(400).json({
                success: false,
                message: "Event is required"
            })
        }
        const tasks = await Task.find({event});

        return res.status(200).json({
            success: true,
            data: tasks
        })
    } catch (error) {
        console.log("Error occured while fetching tasks", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const { taskId } = req.body;
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            })
        }

        await Task.findByIdAndDelete(taskId);

        return res.status(200).json({
            success: true,
            message: "Task deleted successfully"
        })
    }
    catch (error) {
        console.log("Error occured while deleting task", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


exports.updateTask = async (req, res) => {
    try {
        const { taskId, name, startTime, endTime, currentVolunteerCount, maxVolunteerNeeded } = req.body;
        
        if (!taskId || !name || !startTime || !endTime || !currentVolunteerCount || !maxVolunteerNeeded) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            })
        }

        task.name = name;
        task.startTime = startTime;
        task.endTime = endTime;
        task.currentVolunteerCount = currentVolunteerCount;
        task.maxVolunteerNeeded = maxVolunteerNeeded;

        await task.save();

        return res.status(200).json({
            success: true,
            message: "Task updated successfully",
            data: task
        })
    }
    catch (error) {
        console.log("Error occured while updating task", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

exports.updateVolunteerTask = async (req, res) => {
    try {
        const { taskId, status, eventId } = req.body;
        const userId = req.user.id; // Get user ID from authenticated user
        
        if (!taskId || !status || !eventId) {
            return res.status(400).json({
                success: false,
                message: "Task ID, status and event ID are required"
            });
        }

        // Find the task
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        // Find or create volunteer record
        let volunteer = await Volunteer.findOne({ user: userId, event: eventId });
        if (!volunteer) {
            volunteer = await Volunteer.create({
                user: userId,
                event: eventId,
                taskPreferred: [],
                taskAllocated: [],
                volunteerHrs: 0
            });
        }

        // Calculate hours between start and end time
        const startTime = new Date(task.startTime);
        const endTime = new Date(task.endTime);
        const hours = (endTime - startTime) / (1000 * 60 * 60); // Convert milliseconds to hours

        // Update volunteer record based on status
        if (status === 'accept') {
            // Check if task is already in preferred list
            if (volunteer.taskPreferred.includes(taskId)) {
                return res.status(400).json({
                    success: false,
                    message: "Task already in preferred list"
                });
            }

            // Check if maximum volunteers reached
            if (task.currentVolunteerCount >= task.maxVolunteerNeeded) {
                return res.status(400).json({
                    success: false,
                    message: "Maximum volunteer limit reached for this task"
                });
            }

            // Add task to preferred list and update hours
            volunteer.taskPreferred.push(taskId);
            volunteer.volunteerHrs += hours;
            task.currentVolunteerCount += 1;
        } else if (status === 'reject' || status === 'leave') {
            // Remove task from preferred list if it exists
            const taskIndex = volunteer.taskPreferred.indexOf(taskId);
            if (taskIndex > -1) {
                volunteer.taskPreferred.splice(taskIndex, 1);
                volunteer.volunteerHrs -= hours;
                if (task.currentVolunteerCount > 0) {
                    task.currentVolunteerCount -= 1;
                }
            } else {
                return res.status(400).json({
                    success: false,
                    message: "Task not found in preferred list"
                });
            }
        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid status. Must be 'accept', 'reject', or 'leave'"
            });
        }

        // Save both volunteer and task records
        await Promise.all([volunteer.save(), task.save()]);

        return res.status(200).json({
            success: true,
            message: `Task ${status}ed successfully`,
            data: {
                task,
                volunteer: {
                    taskPreferred: volunteer.taskPreferred,
                    volunteerHrs: volunteer.volunteerHrs
                }
            }
        });
    }
    catch (error) {
        console.log("Error occurred while updating volunteer task", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};