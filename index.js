var express = require('express');

var app = express();
var address = require('address');
var opn = require('opn')
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var axios = require('axios');

app.use(express.static('public'));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});


// var post_data = '{ \"head\": { \"sessionid\": \"undefined\", \"userid\": \"\", \"freeloginuser\": true, \"seqid\": null }, \"body\": { \"param1\": { \"basetype\": \"192.168.60.90\" }, \"param2\": { \"basetype\": 4096 }, \"param3\": { \"basetype\": 2 } } }'; 
var muteData = '{ "head": { "sessionid": "undefined", "seqid": null }, "body": { "basetype": true } }';
// var url= 'http://192.168.60.26/mtapi/audio/quietlocalspeaker';

var EmMtModel = {
  "emX500": "X500",
  "emH950": "H950",
  "emX300": "X300",
  "emX7004K": "X7004K",
  "emX5004K": "X5004K",
  "emX5001080P": "X5001080P",
  "emX3001080P60": "X3001080P60",
  "emX3001080P30": "X3001080P30",
  "emX300720P60": "X300720P60",
  "em3001080P30": "MT3001080P30",
  "em300720P60": "MT300720P60",
  "em300oem1080P30": "MT300oem1080P3",
  "em300L1080P30": "MT300L1080P30",
  "em300L720P60": "MT300L720P60",
  "em300Loem1080P30": "MT300Loem1080P30",
  "em3001080P60": "MT3001080P60",
  "em300720P30": "MT300720P30",
  "em300L1080P60": "MT300L1080P60",
  "em300L720P30": "MT300L720P30",
  "emX300720P30": "MTX300720P30",
  "em1001080P30": "MT1001080P30",
  "em100720P": "MT100720P",
  "em100oem1080P30": "MT100oem1080P30",
  "emSkyWindows": "MTSkyWindows",
  "emSkyIPad": "MTSkyIPad",
  "emSkyIPhone": "MTSkyIPhone",
  "emSkyAndroidPad": "MTSkyAndroidPad",
  "emSkyAndroidPhone": "MTSkyAndroidPhone",
  "emX3001080P60S": "MTX3001080P60S",
  "emX5001080P60S": "MTX5001080P60S",
  "em3001080P60S": "MT3001080P60S",
  "emX700S": "MTX700S",
  "emX5004KS": "MTX5004KS",
  "em1001080P3012S": "MT1001080P3012S",
  "emX3001080P60CS": "MTX3001080P60CS",
  "emX5001080P60CS": "MTX5001080P60CS",
  "em3001080P60CS": "MT3001080P60CS",
  "emX700CS": "MTX700CS",
  "emX5004KCS": "MTX5004KCS",
  "em1001080P3012XCS": "MT1001080P3012XCS"
};
//默认值为X500类型

var a = `true`
var getMtModel=  function() {
  axios.get('http://192.168.60.26/mtapi/entity/globalstate?{"head":{"sessionid":"undefined","seqid":null},"body":{}}')
  .then((response) => { 
    if (response.data.body.achSerialNum == 'KDC003002'){
      a = '1'
    }

  
  })

}
getMtModel()

var config = new Object();
config = {
  method: 'post',
  url: 'http://192.168.60.26/mtapi/audio/quietlocalspeaker',
  data: muteData
}

function objReplaceKeyValue(obj, key, str1, str2) {
  console.log(key, str1, str2);
  obj[key] = obj[key].replace(str1, str2);
  return obj;
}


// setInterval(() => {
//   var info = getMtModel()
//   io.emit('chat message',info);
//   console.log(info)
// }, 500);

io.on('connection', function (socket) {
  socket.on('chat message', function (msg) {
 
  });
  io.emit('chat message', a);

  socket.on('ADD', function (data) {
    axios.get('http://192.168.60.26/mtapi/entity/globalstate?{"head":{"sessionid":"undefined","seqid":null},"body":{}}').then((response) => {
      console.log(response.data.body.achSerialNum);
      getMtModel();
      io.emit('chat message', a);
    })
  });

});

http.listen(port, function () {
  console.log('listening on *:' + port);
});

 var localhost = address.ip();
 opn('http://' + (localhost || 'localhost') + ':' + port)
