const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const router = require('./routes/routes');
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/uploads', express.static('uploads'));
app.use(router);

mongoose.connect(`mongodb://localhost:27017/reviewProject`)

let connection = mongoose.connection

connection.once('open', () => {
    console.log('MongoDB connected');
})

app.listen(port, () =>  {
    console.log(`App is listening in ${port}`);
})

