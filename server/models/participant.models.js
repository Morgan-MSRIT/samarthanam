const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Participant', participantSchema);
