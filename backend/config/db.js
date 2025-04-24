// 
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await
            mongoose.connect(process.env.MONGO_URI, {   // mongodb connection string
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        console.log("MongoDB Connected");
    } catch (error) {
        console.log("MongoDB Connection Error:", error);
        process.exit(1);
    }
};

module.exports = connectDB;
