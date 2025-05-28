const express = require('express');
const connectDB = require('./config/database');
const app = express();
const User = require('./models/user');

app.post('/signup', async (req, res) => {
    const user = new User({
        firstName: 'Sanjay',
        lastName: 'Kumar',
        emailId: 'kumarsanjay3722@gmail.com',
        password: 'sanjay@123',
        gender: 'male'
    })

    try{
        await user.save();
        res.send('User added successfuly!')
    } catch(err){
        res.status(400).send('Error saving user: ', err.message)
    }
})


connectDB().then(() => {
    console.log("Database connection estabilshed!");

    app.listen(7777, () => {
        console.log('Server is started!')
    });
}).catch((err) => {
    console.log("Database is not connected!")
})
  