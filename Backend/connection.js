const {Client} = require("pg");
const DB = new Client({
    user : "postgres",
    host : "localhost",
    database: "TodoList",
    port : 5432,
    password : "vishal"
})
DB.connect((err)=>{
    if(err){
        console.error('Connection error:', err.stack);
    }else{
        console.log("connected");
    }
})
module.exports = DB;