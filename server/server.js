import http from "http";
import app from "./app.js";
import { initializeSocket } from "./socket.js";

const PORT=process.env.PORT || 3000;
const server=http.createServer(app);
initializeSocket(server);

server.listen(PORT,()=>{
    console.log(`Server is listening at port ${PORT}`);
});
