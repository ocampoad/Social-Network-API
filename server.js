const express = require('express');
const mongoose = require('mongoose');

const app = express(); 

const PORT = process.env.PORT || 3001;

mongoose.connect('mongodb+srv://ocampoad:E4JEuVUqFzs9QvK@cluster0.ga9ahxg.mongodb.net/socialNetworkDB?retryWrites=true&w=majority')
.then( () => {
    console.log('Success!');
})
.catch(err => console.log(err));

app.use( express.json());
app.use(express.urlencoded( {extended: true}));

app.listen( PORT, () => console.log(`App listening on port http://localhost:${PORT}`))