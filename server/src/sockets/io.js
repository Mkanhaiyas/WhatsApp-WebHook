import { Server } from "socket.io";

export const configureIO = (httpServer) => {
  const io = new Server(httpServer, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    socket.on("join", (wa_id) => {
      socket.join(wa_id);
    });
  });

  return io;
};
