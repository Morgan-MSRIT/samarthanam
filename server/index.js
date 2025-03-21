const express=require("express");
const app=express();

//connection for databse
const database=require("./configs/database");
const cookieParser=require("cookie-parser");
const cors=require("cors");
// const { cloudinaryConnect }=require("./configs/cloudinary");
const dotenv=require("dotenv");

dotenv.config();

//Routes
const authRoutes=require("./routes/auth.routes");
const userRoutes=require("./routes/user.routes");
const eventRoutes=require("./routes/event.routes");
const volunteerRoutes=require("./routes/volunteer.routes");
const taskRoutes=require("./routes/task.routes");
const tagRoutes=require("./routes/tag.routes");
const feedbackRoutes=require("./routes/feedback.routes");


//port no
const PORT=process.env.PORT || 4000;

//connect
database.connect();


//cloudinary connect
// cloudinaryConnect();


//to parse json
app.use(express.json());

//to parse cookie
app.use(cookieParser());

//establishing connection between frontend and backend through cors
app.use(
    cors({
        origin:"*",
        // origin:"http://localhost:3000",
        credentials:true
    })
);



//mounting routes
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/user',userRoutes);
app.use('/api/v1/event',eventRoutes);
app.use('/api/v1/volunteer',volunteerRoutes);
app.use('/api/v1/task',taskRoutes);
app.use('/api/v1/tag',tagRoutes);
app.use('/api/v1/feedback',feedbackRoutes);

  
//default route
app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"Your server is up and running"
    })
});


//Activate server

app.listen(PORT,()=>{
    console.log(`App is running at ${PORT}`)
})


