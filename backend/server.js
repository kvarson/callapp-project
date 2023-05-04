const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

// Serve static files from the client folder
app.use(express.static(path.join(__dirname, "client")));

// Define a route to get all the data
app.get("/data", (req, res) => {
  // Read the data from the file system
  const data = fs.readFileSync(path.join(__dirname, "data", "data.json"));

  // Parse the data as JSON and send it to the client
  res.json(JSON.parse(data));
});

// Define a route to get a single item of data
app.get("/data/:id", (req, res) => {
  const id = req.params.id;

  // Read the data from the file system
  const data = JSON.parse(
    fs.readFileSync(path.join(__dirname, "data", "data.json"))
  );

  // Find the item with the specified id
  const item = data.find((item) => item.id === id);

  if (item) {
    // If the item was found, send it to the client
    res.json(item);
  } else {
    // If the item was not found, send a 404 error to the client
    res.status(404).json({ message: `Item with id ${id} not found` });
  }
});

// Define a route to create a new item of data
app.post("/data", (req, res) => {
  // Read the data from the file system
  const data = JSON.parse(
    fs.readFileSync(path.join(__dirname, "data", "data.json"))
  );

  // Generate a new id for the item
  const id = Math.max(...data.map((item) => parseInt(item.id)), 0) + 1;

  // Create a new item with the provided data and the generated id
  const newItem = { id: id.toString(), ...req.body };

  // Add the new item to the data array
  data.push(newItem);

  // Write the updated data to the file system
  fs.writeFileSync(
    path.join(__dirname, "data", "data.json"),
    JSON.stringify(data)
  );

  // Send the new item to the client
  res.json(newItem);
});

// Define a route to update an existing item of data
app.put("/data/:id", (req, res) => {
  const id = req.params.id;

  // Read the data from the file system
  const data = JSON.parse(
    fs.readFileSync(path.join(__dirname, "data", "data.json"))
  );

  // Find the item with the specified id
  const index = data.findIndex((item) => item.id === id);

  if (index !== -1) {
    // If the item was found, update its data
    data[index] = { id: id, ...req.body };

    // Write the updated data to the file system
    fs.writeFileSync(
      path.join(__dirname, "data", "data.json"),
      JSON.stringify(data)
    );

    // Send the updated item to the client
    res.json(data[index]);
  } else {
    // If the item was not found, send a 404 error to the client
    res.status(404).json({ message: `Item with id ${id} not found` });
  }
});
