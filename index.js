var express = require('express');
var app = express();
var address = require('address');
var opn = require('opn')
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var axios = require('axios');
// var post_data = '{ \"head\": { \"sessionid\": \"undefined\", \"userid\": \"\", \"freeloginuser\": true, \"seqid\": null }, \"body\": { \"param1\": { \"basetype\": \"192.168.60.90\" }, \"param2\": { \"basetype\": 4096 }, \"param3\": { \"basetype\": 2 } } }'; 
var muteData = '{ "head": { "sessionid": "undefined", "seqid": null }, "body": { "basetype": true } }';
// var url= 'http://192.168.60.26/mtapi/audio/quietlocalspeaker';

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


app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

setInterval(() => {
  axios.get('http://192.168.60.26/mtapi/entity/globalstate?{"head":{"sessionid":"undefined","seqid":null},"body":{}}').then((response) => {
    console.log(response.data.body.achSerialNum);
    io.emit('chat message', response.data.body.achSerialNum);
  })
}, 500);
io.on('connection', function (socket) {
  socket.on('chat message', function (msg) {
    io.emit('chat message', msg);
  });

  socket.on('ADD', function (data) {

    axios.get('http://192.168.60.26/mtapi/entity/globalstate?{"head":{"sessionid":"undefined","seqid":null},"body":{}}').then((response) => {
      console.log(response.data.body.achSerialNum);
      io.emit('chat message', response.data.body.achSerialNum);
    })
  });



});

http.listen(port, function () {
  console.log('listening on *:' + port);
});

var localhost = address.ip();
opn('http://'+(localhost||'localhost')+':'+ port)
