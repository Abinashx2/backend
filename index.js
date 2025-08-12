import express from "express";
const app=express();
const PORT=5555;
const mongoUrl='mongodb+srv://Abinash:Abdai6000@cluster0.vg2ewep.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
import blog from "./routes/blog.js";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv'
import authroutes from './routes/auth.js';


dotenv.config();


app.use(express.json());
app.use(cors({
    origin: 'https://northeastimes.netlify.app/',
    method: ['GET', 'POST'],
    Credential:true,
}));
app.get('/', (req, res)=>{
    res.send("Welcome to Bodoland times");
});
// app.use('/', blogPost);
app.use('/', blog);
app.use('/api/auth', authroutes);


// app.use(cors('http://localhost:3000'));








mongoose.connect(mongoUrl,{

}).then(()=>{
    console.log("connected to database");
}).catch((err)=>{
    console.log("could not connec to database", err);
})

app.listen(PORT, ()=>{
    // res.send('Hello world');
    console.log(`App is listening to port ${PORT}`);
})










// import express from 'express';
// console.log('Starting the server...');  // Debug log to check execution

// const app = express();
// const PORT = 5555;

// app.listen(PORT, () => {
//   console.log(`Server started at port ${PORT}`);
// });
