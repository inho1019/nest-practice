const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (ws) => {
  ws.send('[서버 접속 완료!]');
  ws.on('message', (message) => {
    ws.send(`[서버로부터의 응답] ${message}`);
  });
  ws.on('close', () => {
    console.log('클라이언트와의 연결이 종료되었습니다.');
  });
});
