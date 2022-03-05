import express from 'express';
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import url from './config';
const app = express()

app.use(bodyParser.json({limit:"30mb", extended: true})) ;
app.use(bodyParser.urlencoded({limit:"30mb", extended: true})) ;
app.use(cors());

const CONNECTION_URL = url.MONGODB ;

const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL,{ useNewUrlParser:true, useUnifiedTopology:true}).then(()=>app.listen(PORT,()=>console.log(`Server running at port: ${PORT}`))).catch((err)=>console.log(err));
