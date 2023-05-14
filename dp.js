//code to connect the express app with MongoDB

const mongoose = require('mongoose');
const uri = "mongodb+srv://mihamedib123:13101968aaaS@cluster0.2apr9p9.mongodb.net/?retryWrites=true&w=majority";
const connectDB = async () => {
    try {
        await mongoose.connect(uri,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        console.log("MongoDB Connected")
    }
    catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

module.exports = connectDB;