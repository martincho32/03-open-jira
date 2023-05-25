import mongoose from "mongoose";

/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 */
const mongoConnection = {
  isConnected: 0,
};

export const connect = async () => {
  if (mongoConnection.isConnected === 1) {
    console.log("Ya estabamos conectados perreque");
    return;
  }

  if (mongoose.connections.length > 0) {
    mongoConnection.isConnected = mongoose.connections[0].readyState;
    if (mongoConnection.isConnected === 1) {
      console.log("Usando conextión anterior");
      return;
    }
    await mongoose.disconnect();
  }

  await mongoose.connect(process.env.MONGO_URL || '');
  mongoConnection.isConnected = 1;
  console.log("Contectado a mongoDB: ", "...");
};

export const disconnect = async () => {

  if (mongoConnection.isConnected === 0) return;
  
  await mongoose.disconnect();
  console.log("Desconectado de mongoDB")
}