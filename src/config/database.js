const mongoose = require('mongoose');

const connectDB = async () => {
   await  mongoose.connect('mongodb+srv://kumarsanjay3722:8VQ5kby4Pb8KVtSa@cluster0.xrysjwu.mongodb.net/devTinder')
   // await  mongoose.connect(process.env.DATABASE)
}
module.exports = connectDB;
