//'use strict';

var nodemailer  = require('nodemailer');
var transporter = nodemailer.createTransport();
var http = require('http');

http.get(
    'http://ip-api.com/json',
    function (err, response) {
        transporter.sendMail(
            {
                from: 'localhost@adaasdadsa.com',
                to: '',
                subject: 'Your IP Address',
                text: err||response
            }
        );
    }
);
