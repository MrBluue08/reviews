let express = require('express');

let mongoose = require('mongoose');

let cors = require('cors');

let app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

mongoose.connect(`mongodb://localhost:27017/reviewProject`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

let connection = mongoose.connection

connection.once('open', () => {
    console.log('MongoDB connected');
})
app.listen(5000, () =>  {
    console.log('App is listening in ');
})