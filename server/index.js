import ws from "ws";

const wss = new ws.Server({port: 54877});

wss.on('connection', ws => {
    ws.on('message', data => {
        const msg = JSON.parse(data);
        console.log(`Got message from => ${msg.nickname} => ${msg.message}`);
        ws.send(data);
    });
    ws.send(JSON.stringify({message: "Connected!", encrypted: false, nickname: "Server"}));
})

