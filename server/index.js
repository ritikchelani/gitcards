require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");


connection();


app.use(express.json());
app.use(cors());

app.use("/users", userRoutes);
app.use("/auth", authRoutes);


const port = process.env.PORT || 5000;
app.listen(port, console.log(`Listening on port ${port}...`));
