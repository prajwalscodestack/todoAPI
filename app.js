require('dotenv').config()
const express = require('express');
const path = require('path');
const mongoose = require("mongoose");
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const index = require('./routes/index');
const app = express();
const port = process.env.PORT||8000;
//connection to database
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex:true
}).then(()=>{
    console.log("DB CONNECTED");
});
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//routes
const authRoutes=require("./routes/Auth");
const userRoutes=require("./routes/User");
const todoRoutes=require("./routes/ToDo");
const categoryRoutes=require("./routes/Categories");



app.use('/api', index);
app.use("/api",authRoutes);
app.use("/api",userRoutes);
app.use("/api",todoRoutes);
app.use("/api",categoryRoutes);

app.listen(port, () => console.log(`app listening on ${port} port!`));
