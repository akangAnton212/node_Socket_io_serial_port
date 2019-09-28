const SerialPort = require('serialport')
const http = require('http')
http.createServer(function (req, res) {

    // SerialPort.list(function (err, ports) {
    //     ports.forEach(function(port) {
    
    //         console.log("pnpId: " + port.pnpId);
    //         console.log("manufacturer: " + port.manufacturer);
    //         console.log("comName: " + port.comName);
    //         console.log("serialNumber: " + port.serialNumber);
    //         console.log("vendorId: " + port.vendorId);
    //         console.log("productId: " + port.productId);
    //     });
    // });

    var serialPort = new SerialPort("/dev/ttyUSB0", {
        baudRate: 19200,
        autoOpen: false
      }, false); // this is the openImmediately flag [default is true]
      
      serialPort.open(function (error) {
        if ( error ) {
          console.log('Gagal Open Port Gan : '+error);
        } else {
          // res.end('Port Kebuka Gan')
          console.log('Port Kebuka Gan');
          serialPort.on('data', function(data) {
            console.log('data received: ' + data);
          });
          serialPort.write("ls\n", function(err, results) {
            if(err){
              console.log('err ' + err);
            }else{
              console.log('results ' + results);
            }  
          });
          serialPort.close();
          serialPort.on('close', function () {
            console.log('closed');
          });
        }
      });
}).listen(8089);