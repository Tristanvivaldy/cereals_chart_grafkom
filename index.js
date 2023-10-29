// Replace 'your_csv_file.csv' with the actual path to your CSV file
const csvFilePath = 'cereal.csv';

fetch(csvFilePath)
  .then(response => response.text())
  .then(data => {
    // Split the CSV into rows
    const rows = data.split('\n');

    // Iterate over rows and split each row into columns
    const parsedData = rows.map(row => row.split(','));

    // Now parsedData is a 2D array representing your CSV content
    console.log(parsedData[1]);
    var total = 0;
    for(var i=3;i<12;i++){
      console.log(parsedData[1][i]);
      total += parseInt(parsedData[1][i]);
    }
    console.log(total);
  })
  .catch(error => console.error('Error fetching the CSV file:', error));

  // 0 = name
  // 1 = mfr
  // 2 = type
  // 3 = calories
  // 4 = protein
  // 5 = fat
  // 6 = sodium
  // 7 = fiber
  // 8 = carbo
  // 9 = sugars
  // 10 = potass
  // 11 = vitamins
  // 12 = shelf
  // 13 = weight
  // 14 = cups
  // 15 = rating