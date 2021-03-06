const WebSocket = require('ws');

const wss = new WebSocket.Server({port: 3030})

wss.on('connection', function connection(ws) {
  console.log('user connected :D')
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      if(client !== ws && client.readyState === WebSocket.OPEN){
        client.send(data);
      }
    })
  })
})