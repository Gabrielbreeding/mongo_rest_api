/* === Boiler Plate ===
     Gabriel Breeding
         Server
        10/5/2021
   ==================== */
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();

const PORT = 5001;
const port = process.env.port || PORT;

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;

db.on("error", (err) => {
    console.log(err);
})

db.once("open", () =>{
    console.log("Connected to database!")
})

// Add middleware
app.use(express.json());

const employeeRouter = require("./controllers/employee_controller");
app.use('/employees', employeeRouter);

// Create Default Route (Endpoint)
app.get('/', (req, res) => res.send("Welcome to Gabriel's Mongo DB Assignment!"));

app.listen(PORT, () => {
    console.log(`Server running on port ${port}`);
})