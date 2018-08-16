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




var terminalIP = ""


var getMtModel = function () {
  axios.get('http://192.168.60.26/mtapi/entity/globalstate?{"head":{"sessionid":"undefined","seqid":null},"body":{}}')
    .then((response) => {
      if (response.data.body.achSerialNum == 'KDC003002') {
        console.log(response.data.body.achSerialNum)
      }
    })
}

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


var timer = {
  timer: ['function', 'interval', 'count']
}

io.on('connection', function (socket) {
  socket.on('terminalIP', (terminalIP) => {
    terminalIP = terminalIP
    console.log(terminalIP)
    io.emit('terminalIP', terminalIP);
    GetAndEmit(terminalIP, 'terminalIP', globalstate)
  })


  socket.on('startcount', (flag) => {
    console.log(flag)
    if (flag) {
      timer.getTer.push(setInterval(() => {
        console.log("counting")
      }, 1000))
    } else {
      timer.getTer.forEach((getTer) => {
        clearInterval(getTer)
        console.log("deled")
      });
      timer.getTer = []
    }
  });

  socket.on('addTimer', ([a, b, c]) => {
    addTimer(a,b,c)
    timer[a][0]
  })

  socket.on('removeTimer', (timerName)=>{
    removetimer(timerName)
  })

});







http.listen(port, function () {
  console.log('listening on *:' + port);
});

//  var localhost = address.ip();
//  opn('http://' + (localhost || 'localhost') + ':' + port)

var globalstate = '/mtapi/entity/globalstate?*'


function addTimer(eventName,interval, count) {
  timer[eventName] = [, interval, count,]
  let i = 0
  timer[eventName][0] = setInterval(
    () => {
      i += 1
      if (i >= timer[eventName][2]) {
        clearInterval(timer[eventName][0])
      }
      console.log(i)
    }, interval * 1000)
}


function removetimer(timerName) {
  clearInterval(timer[timerName][0])
  console.log('timer: ' + timerName + ' destroyed!')
  timer[timerName] = []
}





function GetAndEmit(IP, eventName, api) {
  let url = 'http://' + IP + api
  axios.get(url).then((response) => {
    let responseBody = response.data.body
    io.emit(eventName, responseBody)
    return responseBody
  }).catch((error) => {
    io.emit(eventName, error)
  })

}


var muteData = '{ "head": { "sessionid": "undefined", "seqid": null }, "body": { "basetype": true } }';

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