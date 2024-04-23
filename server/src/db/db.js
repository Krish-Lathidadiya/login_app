const mongoose =require('mongoose');

const uri=process.env.MONGODB_URI

const connectionDB=async()=>{
    try {
        await mongoose.connect(uri)
        console.log("database connection successful");
    } catch (error) {
        console.error("database connection error");
        process.exit(0);
    }
}
module.exports = connectionDB