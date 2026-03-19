const XLSX = require("xlsx");

// Read workbook
const workbook = XLSX.readFile("input.xlsx");

// Get first sheet
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Convert to JSON
let data = XLSX.utils.sheet_to_json(worksheet);

// Stop if empty
if (!data.length) {
  console.log("No data found!");
  process.exit(0);
}

// 🔥 Reverse rows (Z → A)
data = data.reverse();

const header = Object.keys(data[0]);

const chunkSize = 10;

for (let i = 0; i < data.length; i += chunkSize) {
  const chunk = data.slice(i, i + chunkSize);

  // Convert back to sheet
  const newWorksheet = XLSX.utils.json_to_sheet(chunk, { header });

  const newWorkbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, "Sheet1");

  XLSX.writeFile(newWorkbook, `output_${i / chunkSize + 1}.xlsx`);
}

console.log("Reversed + split completed!");
