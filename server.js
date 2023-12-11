const express = require("express");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 3000;
const url =
  "YOUR_SHEET_LINK_WITH_API_IN_THE_FOLLOWING_FORMAT";
// https://sheets.googleapis.com/v4/spreadsheets/SHEET_ID/values/Sheet1?key=API_KEY

// const getdata = () =>
//   fetch(url)
//     .then((response) => response.json())
//     .then((jsonData) => {
//       const [, keys, ...rows] = jsonData.values;
//       const result = {};
//       rows.forEach((row) => {
//         const key = row[0];
//         const value = row[1];
//         result[key] = value;
//       });
//       return result;
//     })
//     .catch((error) => {
//       console.error("Error fetching JSON data:", error);
//     });
// const dataPromise = getdata();
// const redirects = JSON.parse(fs.readFileSync('redirects.json', 'utf-8'));
// const redirects = dataPromise.then((data) => console.log(data))

// Redirect route handler

app.get("/:redirectKey", (req, res) => {
  const { redirectKey } = req.params;
  const getdata = () =>
    fetch(url)
      .then((response) => response.json())
      .then((jsonData) => {
        const [, keys, ...rows] = jsonData.values;
        const result = {};
        rows.forEach((row) => {
          const key = row[0];
          const value = row[1];
          result[key] = value;
        });
        return result;
      })
      .catch((error) => {
        console.error("Error fetching JSON data:", error);
      });
  const dataPromise = getdata();
  dataPromise.then((redirects) => {
    if (redirects[redirectKey]) {
      res.redirect(redirects[redirectKey]);
    } else {
      // Handle 404 errors
      res.status(404).send("Not Found");
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
