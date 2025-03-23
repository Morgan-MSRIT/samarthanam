const express = require("express");
const app = express();

//connection for databse
const database = require("./configs/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// const { cloudinaryConnect }=require("./configs/cloudinary");
const dotenv = require("dotenv");

dotenv.config();

//Routes
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const eventRoutes = require("./routes/event.routes");
const volunteerRoutes = require("./routes/volunteer.routes");
const taskRoutes = require("./routes/task.routes");
const tagRoutes = require("./routes/tag.routes");
const feedbackRoutes = require("./routes/feedback.routes");

//port no
const PORT = process.env.PORT || 4000;

//connect
database.connect();

//cloudinary connect
// cloudinaryConnect();

//to parse json
app.use(express.json());

//to parse cookie
app.use(cookieParser());

// CORS configuration
app.use(cors());  // Allow all origins temporarily for debugging

// Add headers for additional CORS support
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    next();
});

//mounting routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/event', eventRoutes);
app.use('/api/v1/volunteer', volunteerRoutes);
app.use('/api/v1/task', taskRoutes);
app.use('/api/v1/tag', tagRoutes);
app.use('/api/v1/feedback', feedbackRoutes);

//default route
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server is up and running"
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        message: "Internal server error",
        error: err.message
    });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Promise Rejection:', err);
});

//Activate server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`App is running at ${PORT}`);
}).on('error', (err) => {
    console.error('Server error:', err);
});


