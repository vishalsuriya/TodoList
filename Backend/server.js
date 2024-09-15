const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const DB = require("./connection");
const PORT  = 8000;
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/tasks", async (req, res) => {
    try {
      const result = await DB.query("SELECT * FROM tasks");
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Database query failed" });
    }
  });

  app.post("/newtask", async (req, res) => {
    try {
      const { description } = req.body;  
      const result = await DB.query(
        "INSERT INTO tasks (description) VALUES($1) RETURNING *",
        [description]
      );
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });
  
app.put("/update/:id",async(req,res)=>{
  try{
    const {id} = req.params;
    const {description} = req.body;
    const result = await DB.query("UPDATE tasks SET description = $1 where task_id= $2 RETURNING *"
      ,[description,id]
    );
    res.json(result.rows[0]);
  }catch(err){
    console.error(err.message);
  }
});

app.delete("/delete/:id",async(req,res)=>{
  try{
    const {id} = req.params;
    const result = await DB.query("DELETE FROM tasks WHERE task_id = $1",
      [id]
    );
    res.json("deleted sucessfully");
  }catch(err){
    console.error(err.message);
  }
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });