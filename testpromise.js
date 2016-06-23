/**
 * Created by giufus on 23/06/16.
 */
var logger= require('morgan')

var a = process.argv[2];

var aPromise_A = new Promise((resolve, reject) => {
    if (a <= 0) {
        console.error('aPromise_A reject', a)
        a++;
        reject(a)
    }
    else {
        console.log('aPromise_A resolve', a)
        resolve(a)
    }
});

var aPromise_B = new Promise((resolve, reject) => {
    if (a <= 0) {
        console.error('aPromise_B reject', a)
        a++;
        reject(a)
    }
    else {
        console.log('aPromise_B resolve', a)
        resolve(a)
    }
});

function promises() {
    aPromise_A
        .then(aPromise_B)
        /*.then(
         (res) => {
         console.log('RESOLVED')
         return 42;
         }, (res) => {
         console.error('REJECTED')
         return res;
         }
         )*/.catch((val) => {
        console.error('THE FINAL rejection', val);
    });
}


function promiseAll() {

    Promise.all([aPromise_A, aPromise_B])
        .then(
            function () {
                console.log(':) YOOOO-OOOHHHH!!!');
            }, function () {
                console.error(':( DOHHHH!!!')
            });

}




setTimeout(promises, 3000);
//setTimeout(promiseAll, 3000);



