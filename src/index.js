const express = require('express');
const connectDB = require('./config/database');
const userRoute = require('./routes/userRoutes');

const app = express();

//connect to DB
connectDB();

//middleware
app.use(express.json());


//routes
app.use('/users', userRoute);

//start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})

