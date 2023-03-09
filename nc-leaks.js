const https = require('node:https');

//const writeFile = require('node:fs');

const fs = require('fs');

const options = {
    hostname: 'nc-leaks.herokuapp.com',
    path: '/api/confidential',
    method: 'GET'
};

const request = https.request(options, function(res){
    let body = '';
    res.on('data', (d) => {
        body += d.toString();
        // const parsedData = JSON.parse(data);
        // console.log(parsedData);
                res.on('end', () =>{
                    const parsedData = JSON.parse(body);
                    const instructions = parsedData.instructions;
                    fs.writeFile('instructions.md', instructions, (err) => {

                        if (err) { 
                            throw err;
                        };
                });
        
        });
    });

});

request.end();