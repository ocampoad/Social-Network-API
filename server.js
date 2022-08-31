const express = require('express');
const mongoose = require('mongoose');
require('dotenv');

const app = express(); 

const PORT = process.env.PORT || 3001;

mongoose.connect(DB_NAME)
.then( () => {
    console.log('Success!');
})
.catch(err => console.log(err));

app.use( express.json());
app.use(express.urlencoded( {extended: true}));

app.listen( PORT, () => console.log(`App listening on port http://localhost:${PORT}`))