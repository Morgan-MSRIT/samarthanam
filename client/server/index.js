const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mock data
const events = [
  {
    id: 1,
    title: 'Educational Workshop',
    date: '2024-04-15',
    location: 'Bangalore',
    description: 'Workshop on digital literacy for visually impaired students',
    type: 'Education',
    requiredSkills: ['Teaching', 'Computer Knowledge'],
    volunteersNeeded: 5,
    image: '/workshop.jpg'
  },
  {
    id: 2,
    title: 'Sports Day',
    date: '2024-04-20',
    location: 'Bangalore',
    description: 'Annual sports day event for blind cricket',
    type: 'Sports',
    requiredSkills: ['Sports Training', 'Event Management'],
    volunteersNeeded: 10,
    image: '/sports.jpg'
  }
];

// Routes
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  // TODO: Implement proper authentication
  if (email && password) {
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.status(400).json({ success: false, message: 'Invalid credentials' });
  }
});

app.get('/api/events', (req, res) => {
  res.json(events);
});

app.post('/api/events/:id/volunteer', (req, res) => {
  const { id } = req.params;
  // TODO: Implement volunteer signup logic
  res.json({ success: true, message: 'Volunteer signup successful' });
});

app.post('/api/events/:id/participate', (req, res) => {
  const { id } = req.params;
  // TODO: Implement participant signup logic
  res.json({ success: true, message: 'Participant signup successful' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 