require('dotenv').config();
const {Client} = require("pg");
const DB = new Client({
    connectionString : process.env.POSTGRES_URL,
})
DB.connect((err)=>{
    if(err){
        console.error('Connection error:', err.stack);
    }else{
        console.log("connected");
    }
})
module.exports = DB;