import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});

// Do not change code above this line
// Route 1: Handle empty date parameter
app.get('/api', (req, res) => {
  const date = new Date();
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Route 2: Handle provided date parameter
app.get('/api/:date', (req, res) => {
  let dateString = req.params.date;
  let date;

  // Check if it is a Unix timestamp (only numbers)
  if (!isNaN(dateString)) {
    date = new Date(parseInt(dateString));
  } else {
    // Handle standard date string
    date = new Date(dateString);
  }

  // Handle invalid date
  if (date.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  // Return the required JSON object
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});
// Do not change code below this line

const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
