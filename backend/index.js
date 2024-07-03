const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const userrouter=require("./routes/user");
const adminrouter=require("./routes/admin");
const signuprouter=require("./controllers/signup");
const signinrouter=require("./controllers/signin");
const {authMiddleware}=require("./middlewares/middleware");
const {adminMiddleware}=require("./middlewares/middleware");
const connectDB=require("./config/db");

const app = express();

app.use(cors());
app.use(express.json()); 
app.use(cookieParser());
dotenv.config({path: '.env.local'});
const PORT=process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.status(200).json({
        message:"Hello World!"
    })
    
});

connectDB();
app.use("/signup",signuprouter);
app.use("/signin",signinrouter);
app.use("/user",authMiddleware,userrouter);
app.use("/admin",authMiddleware,adminMiddleware,adminrouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});