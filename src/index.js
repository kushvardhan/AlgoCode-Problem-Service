const express = require("express");
const { PORT } = require("./config/server.config");
const errorHandler = require("./utils/errorHandler");
const NotImplementedError = require("./errors/notImplemented.error");
const connectDB = require("./config/db.config");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());

app.use("/api", require("./routes"));

app.get("/ping", (req, res) => {
  res.send("pong");
});


app.use(errorHandler);
app.listen(PORT, async() => {
  console.log(`Server is running on port ${PORT}`);
  await connectDB();
  console.log("Connected to DB.");
});
