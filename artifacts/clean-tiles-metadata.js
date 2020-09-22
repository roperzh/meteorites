const metadata = require("../tiles/metadata.json");
const { writeFileSync, copyFileSync } = require("fs");

// make a backup of the data in case something goes wrong
copyFileSync("../tiles/metadata.json", "../tiles/metadata.backup.json");

// convert the `vector_layers` key from a string to JSON
metadata.vector_layers = JSON.parse(metadata.json).vector_layers;

// Set the tiles key
metadata.tiles = [`${process.env.TILES_HOST || 'http://localhost:5000'}/tiles/{z}/{x}/{y}.pbf`];

// Remove the `json` key to prevent errors
delete metadata.json;

// Write the updated file
writeFileSync("../tiles/metadata.json", JSON.stringify(metadata));
