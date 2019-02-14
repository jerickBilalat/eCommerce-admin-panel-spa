const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json({
    "message": "hello"
  })
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => { console.log(`Server running at port ${PORT}`)});