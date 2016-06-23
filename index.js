
var promised = require('./promised.js');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport();
var http = require('http');
var fs = require('fs');

var currentIp;

function withCallbacks() {
    fs.readFile('currentip.txt', "UTF-8", (err, data) => {
        if (err)
            throw err;

        currentIp = data;


        http.get(
            'http://ipecho.net/plain',
            (res) => {
                if (res && res.statusCode == 200) {
                    res.resume();
                }

                res.on('data', (res) => {
                        if(res.toString() != currentIp){
                            fs.writeFile('currentip.txt', res.toString(), function () {
                                transporter.sendMail(
                                    {
                                        from: 'yourip@ilgrandemazinger.com',
                                        to: '@gmail.com',
                                        subject: new Date().toString() + ' - Your IP Address today is...',
                                        text: res
                                    },(err, resp) => {
                                        if(err)
                                            console.error(err)
                                        else
                                            console.log(resp);
                                    }
                                );
                            });
                        }
                    }
                );
            })

    });
}



function withPromises() {
    promised.getExternalIp('http://ipecho.net/plain')
    .then(promised.evaluateIpResponse, console.error)
    .then((res)=>{currentIp = res; console.log('current ip is: ', currentIp.toString())}, console.error)
    .then(promised.readFile, console.error)
    .then((res)=>{
            if(currentIp.toString() === res.toString())
                console.log('no need to send mail, ip is unchanged ');
            else{
                console.log('now lets send a mail');
                return currentIp.toString()
            }
                
        }, console.error)
    .then(promised.writeFile, console.error)
    .then(promised.sendMailToGiufus, console.error);

}

//withCallbacks();

withPromises();


