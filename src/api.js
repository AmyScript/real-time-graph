import IO from "socket.io-client";
const socket = IO("http://localhost:3001");

export const subScribeToDataStream = cb => {
  socket.on("fakeFinancialData", data => cb(null, data));
  socket.emit("subScribeToDataStream");
};
