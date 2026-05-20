const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/waitlist", (req, res) => {
  const email = req.body.email;
  if (!email) return res.status(400).send("No email");

  const file = "./leads.json";
  const leads = fs.existsSync(file)
    ? JSON.parse(fs.readFileSync(file))
    : [];

  leads.push({ email, date: new Date().toISOString() });

  fs.writeFileSync(file, JSON.stringify(leads, null, 2));

  res.send("OK");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on " + PORT);
});