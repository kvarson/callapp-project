const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");

const port = 3000;
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "client")));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.get("/data", (req, res) => {
  const data = fs.readFileSync(path.join(__dirname, "data", "data.json"));

  res.json(JSON.parse(data));
});

app.get("/data/:id", (req, res) => {
  const id = req.params.id;

  const data = JSON.parse(
    fs.readFileSync(path.join(__dirname, "data", "data.json"))
  );

  const item = data.filter((item) => item.id == id);

  if (item.length > 0) {
    res.json(item);
  } else {
    res.status(404).json(`{ message: Item with id ${id} not found }`);
  }
});

app.post("/data", (req, res) => {
  const data = JSON.parse(
    fs.readFileSync(path.join(__dirname, "data", "data.json"))
  );

  const id = Math.max(...data.map((item) => parseInt(item.id)), 0) + 1;

  const newItem = { id: id.toString(), ...req.body };

  data.push(newItem);

  fs.writeFileSync(
    path.join(__dirname, "data", "data.json"),
    JSON.stringify(data)
  );

  res.json(newItem);
});

app.put("/data/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const data = JSON.parse(
    fs.readFileSync(path.join(__dirname, "data", "data.json"))
  );

  const index = data.findIndex((item) => item.id === id);

  if (index !== -1) {
    data[index] = { id: id, ...req.body };

    fs.writeFileSync(
      path.join(__dirname, "data", "data.json"),
      JSON.stringify(data)
    );

    res.json(data[index]);
  } else {
    res.status(404).json(`{ message: Item with id ${id} not found }`);
  }
});

app.delete("/data/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const data = JSON.parse(
    fs.readFileSync(path.join(__dirname, "data", "data.json"))
  );

  const index = data.findIndex((obj) => obj.id == id);

  if (index === -1) {
    return res.status(404).send("Object not found");
  }

  data.splice(index, 1);

  fs.writeFileSync(
    path.join(__dirname, "data", "data.json"),
    JSON.stringify(data)
  );

  res.send(`item with id ${id} has been successfully deleted`);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
