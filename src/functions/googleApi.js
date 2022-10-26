require("dotenv").config();
const { google } = require("googleapis");
const auth = new google.auth.GoogleAuth({
  keyFile: "./keyfile.json",
  scopes: "https://www.googleapis.com/auth/spreadsheets",
});

const sheets = google.sheets({ version: "v4", auth: auth });

async function getSheet(spreadsheetId, range) {
  return await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });
}

async function updateSheet(spreadsheetId, range, values) {
  return await sheets.spreadsheets.values.update({
    spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: values,
    },
  });
}

getSheet(process.env.SPREADSHEET_ID, `Bracket Schedules (RO64)!C5:M171`).then(
  (values) => {
    values.data.values.forEach(element => {
        if(element[0] === "100") {
            console.log(element[element.length - 4]);
            console.log(element[element.length - 1]);
        }
    });
  }
);

// getSheet("12TQFFRKEhMCzZaB1LctXdoh9J6_QJRzbLMjuH7IlCZE", "TestSheet!A1:A1").then(res => {
//     console.log(res.data);
// });

// updateSheet("12TQFFRKEhMCzZaB1LctXdoh9J6_QJRzbLMjuH7IlCZE", "TestSheet!A1:A1", [["Hello"]]).then(res => {
//     console.log(res.data);
// });
