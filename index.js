//'use strict';

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport();
var http = require('http');
var fs = require('fs');

ipGettersList = new Array();
ipGettersList.push('http://ipecho.net/plain');

var currentIp;
setTimeout(test,5000)

function test() {
    fs.readFile('currentip.txt', "UTF-8", (err, data) => {
        if (err)
            throw err;

        currentIp = data;


        http.get(
            ipGettersList[0],
            (res) => {
                if (res && res.statusCode == 200) {
                    res.resume();
                }

                res.on('data', (res) => {
                        if(res != currentIp){
                            fs.writeFile('currentip.txt', res, function () {
                                transporter.sendMail(
                                    {
                                        from: 'yourip@ilgrandemazinger.com',
                                        to: '',
                                        subject: new Date().toString() + ' - Your IP Address today is...',
                                        text: res
                                    }
                                );
                            });
                        }
                    }
                );
            }).on('error', (e) => {
                console.log(`Got error: ${e.message}`);
            })

    });
}





