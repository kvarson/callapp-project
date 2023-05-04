const fs = require("fs");

const dataFilePath = "./backend/data/data.json";

// Read the data from the file
const rawData = fs.readFileSync(dataFilePath, "utf-8");
const data = JSON.parse(rawData);

// Create a new record
const newRecord = { name: "John Doe", age: 30 };
data.push(newRecord);

// Write the updated data back to the file
fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));

console.log("New record created:", newRecord);
