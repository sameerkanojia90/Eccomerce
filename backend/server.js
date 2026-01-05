const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");



const app = express();
const PORT = 7000;

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const path = require("path");
app.use(express.static(path.join(__dirname, "../Frontend/public")));


app.use("/", authRoutes)


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
