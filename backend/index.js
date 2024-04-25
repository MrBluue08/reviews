const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const router = require('./routes/routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(router);

mongoose.connect(`mongodb://localhost:27017/reviewProject`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

let connection = mongoose.connection

connection.once('open', () => {
    console.log('MongoDB connected');
})

app.listen(5000, () =>  {
    console.log('App is listening in 5000');
})

