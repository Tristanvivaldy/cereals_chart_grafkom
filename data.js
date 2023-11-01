const cereal = "cereal.csv";
export var tabel = document.querySelector(".table");
export var imageData = lib.ctx.getImageData(0, 0, lib.canvas.width, lib.canvas.height);

import * as lib from './lib.js';

// Fetch the CSV file using the fetch API
fetch(cereal)
  .then((response) => response.text())
  .then((csvData) => {
    // Parse the CSV data using Papaparse
    Papa.parse(csvData, {
      header: true, // Set to true if your CSV has headers
      dynamicTyping: true, // Automatically convert string values to appropriate types
      complete: function (result) {
        // The parsed data is available in the 'data' property of the result object
        console.log(result.data);
        table(result.data);
      },
      error: function (error) {
        console.error("Error parsing CSV:", error.message);
      },
    });
  })
  .catch((error) => {
    console.error("Error fetching CSV:", error.message);
  });

  export function table(data) {
    const table = document.getElementById("table");
  
    // Function to capitalize the first letter of a string
    const capitalizeFirstLetter = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };
  
    // Add table headers
    const headers = Object.keys(data[0]);
    const headerRow = table.insertRow(0);
    headers.forEach((headerText) => {
      const capitalizedHeader = capitalizeFirstLetter(headerText);
      const headerCell = document.createElement("th");
      headerCell.textContent = capitalizedHeader;
      headerCell.style.border = "1px solid black"; // Add border to the header cell
      headerRow.appendChild(headerCell);
    });
  
    // Add table rows
    data.forEach((rowData, index) => {
      // Check if any value in the row is null
      if (Object.values(rowData).some(value => value === null)) {
        return; // Skip the row if it contains null values
      }
  
      const row = table.insertRow(-1);
      headers.forEach((header) => {
        const cell = row.insertCell(-1);
        const cellValue = rowData[header];
        cell.textContent = cellValue !== null ? cellValue : ''; // Replace null with an empty string
        cell.style.border = "1px solid black"; // Add border to the cell
      });
  
      // Add a button to the row that provides the index when clicked
      const buttonCell = row.insertCell(-1);
      const button = document.createElement("button");
      button.textContent = "Show";
      button.style.border = "1px solid black"; // Add border to the button
      button.addEventListener("click", () => {
        showData(index,rowData);
      });
      buttonCell.appendChild(button);
    });
  }

export function showData(index, data){
  lib.ctx.clearRect(0,0,lib.canvas.width,lib.canvas.height)
  imageData = lib.ctx.getImageData(0, 0, lib.canvas.width, lib.canvas.height);
  lib.lingkaran_polar(imageData, [lib.canvas.width/2,lib.canvas.height/2], 200, [1,0,0]);
  var arr = [];
  var total = 0;
  for (var i in data){
    if (i == 'calories' || i == 'protien' || i == 'fat' || i == 'sodium' || i == 'fiber' || i == 'carbo' || i == 'sugars' || i == 'potass' || i == 'vitamins'){
      total += data[i];
    }
  }
  for (var i in data){
    if (i == 'calories' || i == 'protien' || i == 'fat' || i == 'sodium' || i == 'fiber' || i == 'carbo' || i == 'sugars' || i == 'potass' || i == 'vitamins'){
      arr.push(parseFloat(((data[i]/total)*100).toFixed(2)));
    }
  }
  for (var i = 0; i < arr.length; i++){
    lib.segi(imageData, [lib.canvas.width/2,lib.canvas.height/2],200,9,[Math.floor(Math.random() * 256),Math.floor(Math.random() * 256),Math.floor(Math.random() * 256)],arr[i])
    lib.ctx.putImageData(imageData,0, 0);
  }
  lib.ctx.putImageData(imageData,0, 0);
  // lib.segi(imageData, [lib.canvas.width/2,lib.canvas.height/2],200,9,[255,0,0],13.18)
  // lib.segi(imageData, [lib.canvas.width/2,lib.canvas.height/2],200,9,[0,0,255],0.75)
  // lib.segi(imageData, [lib.canvas.width/2,lib.canvas.height/2],200,9,[0,255,0],0.18)
  // lib.segi(imageData, [lib.canvas.width/2,lib.canvas.height/2],200,9,[255,255,0],24.48)
  // lib.segi(imageData, [lib.canvas.width/2,lib.canvas.height/2],200,9,[0,255,255],1.88)
  // lib.segi(imageData, [lib.canvas.width/2,lib.canvas.height/2],200,9,[255,0,255],0.94)
  // lib.segi(imageData, [lib.canvas.width/2,lib.canvas.height/2],200,9,[100,100,100],1.12)
  // lib.segi(imageData, [lib.canvas.width/2,lib.canvas.height/2],200,9,[50,50,50],52.73)
  // lib.segi(imageData, [lib.canvas.width/2,lib.canvas.height/2],200,9,[50,100,150],4.7)
  // lib.gambar_titik(imageData, lib.canvas.width/2+100,lib.canvas.height/2-10, [255,0,0]) 
}
  
  