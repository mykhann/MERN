import mongoose from "mongoose";

const MongoUri= process.env.MONGO_URI
const DbName= process.env.DB_NAME
const connectToDatabase=async()=>{
    const connect= await mongoose.connect(`${MongoUri}/${DbName}`).
    then(()=>{console.log(`Connected To database ${DbName}`)}).
    catch(()=>{
        console.log(`Failed to connect to database ${DbName}`);
    })
}

export {connectToDatabase}
