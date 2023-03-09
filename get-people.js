const https = require("node:https");

//const writeFile = require('node:fs');

const fs = require("fs");

const options = {
  hostname: "nc-leaks.herokuapp.com",
  path: "/api/people",
  method: "GET",
};

const request = https.request(options, function (res) {
  res.on("data", (data) => {
    const parsedData = JSON.parse(data);

    const northcoders = parsedData.people.filter(
      (person) => person.job.workplace === "northcoders"
    );
    const ncString = JSON.stringify(northcoders);
    fs.writeFile("northcoders.json", ncString, (err) => {
      if (err) {
        throw err;
      }
    });
  });
});
request.end();

// console.log(northcoders);
//console.log(parsedData);
//change data into usable object
//look through people to find everyone with 'northcoders' workplace
//make 'northcoders' into a string
//push 'northcoders' into new file called northcoders.JSON with fs.writeFile
