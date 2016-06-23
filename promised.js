
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport();
var http = require('http');
var fs = require('fs');

exports.readFile = function () {
    return new Promise((resolve, reject) => {
        fs.readFile('currentip.txt', 'UTF-8', (err, data) => {
            if (err) {
                reject(err);
            } else{
                console.log('file content is', data);
                resolve(data);
            }
        });
    });
};

exports.getExternalIp = function (provider) {
    return new Promise((resolve, reject) => {
        http.get(provider, (res) => {
            if(res)
                resolve(res)
            else
                reject()
        })
    });
};

exports.evaluateIpResponse = function (emitted) {
    return new Promise((resolve, reject) => {
        emitted.on('error', ()=>{
            console.error('error evaluating ip address');
            reject();
        });
        emitted.on('data', (data)=> {
            console.log("evaluated ip is: ", data.toString())
            resolve(data);
        });
    });
};


exports.matchIps = function (read) {
    return new Promise((resolve, reject) => {
        if (currentIp === read) {
            console.error("no nede to send mail, ip is unchanged")
            reject();
        } else {
            console.log("IP is new!")
            resolve(read);
        }
    });
};

exports.writeFile = function (currentIp) {
    return new Promise((resolve, reject) => {
        fs.writeFile('currentip.txt', currentIp, (err, data) => {
            if (err) {
                console.error('impossible write file to update stored ip address')
                reject(err);
            } else {
                console.log('file content updated with new ip address:', currentIp);
                resolve(currentIp);
            }
        });
    });
};

exports.sendMailToGiufus = function (text) {
    return new Promise((resolve, reject) => {
        transporter.sendMail(
            {
                from: 'yourip@ilgrandemazinger.com',
                to: '@gmail.com',
                subject: new Date().toString() + ' - Your IP Address today is...',
                text: text
            },
            (err, res) => {
                if(err){
                    console.error('unable to send mail:', err)
                    reject(err);
                } else{
                    console.log('mail sent correctly', res)
                    resolve(res);
                }

            }
        );
    });
};
