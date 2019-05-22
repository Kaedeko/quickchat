import ws from "ws";

const wss = new ws.Server({port: 54877});

wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === ws.OPEN) {
            client.send(data);
        }
    });
};

wss.on('connection', ws => {
    ws.on('message', data => {
        const msg = JSON.parse(data);
        console.log(`Got message from => ${msg.nickname} => ${msg.message}`);
        wss.broadcast(data);
    });
    ws.send(JSON.stringify({message: "Connected!", encrypted: false, nickname: "Server"}));
})

