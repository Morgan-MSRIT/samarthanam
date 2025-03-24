const User = require('../models/user.models');
const Event = require('../models/event.models');

const getRecommendedEvents = async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Get user's tags
    const user = await User.findById(userId).populate('tags');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    console.log('User tags:', user.tags.map(tag => tag.name));

    // Get all events
    const events = await Event.find()
      .populate('tags')
      .populate('user', 'name')
      .sort({ startDate: 1 });

    console.log('Total events:', events.length);

    // Filter and sort events based on user's tags
    const recommendedEvents = events
      .filter(event => {
        // Check if event has any matching tags with user
        const hasMatchingTag = event.tags.some(eventTag => 
          user.tags.some(userTag => userTag._id.toString() === eventTag._id.toString())
        );
        
        if (hasMatchingTag) {
          console.log('Matching event:', event.name, 'with tags:', event.tags.map(tag => tag.name));
        }
        
        return hasMatchingTag;
      })
      .map(event => ({
        ...event.toObject(),
        isRecommended: true
      }));

    console.log('Recommended events count:', recommendedEvents.length);

    return res.status(200).json({
      success: true,
      data: recommendedEvents
    });
  } catch (error) {
    console.error('Error in getRecommendedEvents:', error);
    return res.status(500).json({
      success: false,
      message: "Error fetching recommended events",
      error: error.message
    });
  }
};

const getEvent = async (req, res) => {
  try {
    const events = await Event.find()
      .populate('tags')
      .populate('user', 'name')
      .sort({ startDate: 1 });

    return res.status(200).json({
      success: true,
      data: events
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching events",
      error: error.message
    });
  }
};

const createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    return res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: event
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error creating event",
      error: error.message
    });
  }
};

const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.body._id,
      req.body,
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Event updated successfully",
      data: event
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating event",
      error: error.message
    });
  }
};

const deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.body.event_id);
    return res.status(200).json({
      success: true,
      message: "Event deleted successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting event",
      error: error.message
    });
  }
};

const participantRegistration = async (req, res) => {
  try {
    const event = await Event.findById(req.body.event);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    if (!event.registeredParticipants.includes(req.body.email)) {
      event.registeredParticipants.push(req.body.email);
      await event.save();
    }

    return res.status(200).json({
      success: true,
      message: "Participant registered successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error registering participant",
      error: error.message
    });
  }
};

const participantDeregistration = async (req, res) => {
  try {
    const event = await Event.findById(req.body.event);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    event.registeredParticipants = event.registeredParticipants.filter(
      email => email !== req.body.email
    );
    await event.save();

    return res.status(200).json({
      success: true,
      message: "Participant deregistered successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deregistering participant",
      error: error.message
    });
  }
};

const getAllRegisterVolunteer = async (req, res) => {
  try {
    const event = await Event.findById(req.body.event_id)
      .populate('volunteers');
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: event.volunteers
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching volunteers",
      error: error.message
    });
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.body.event_id)
      .populate('tags')
      .populate('user', 'name')
      .populate('tasks');

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: event
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching event",
      error: error.message
    });
  }
};

module.exports = {
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  participantRegistration,
  participantDeregistration,
  getAllRegisterVolunteer,
  getEventById,
  getRecommendedEvents
}; 