import {Server} from "http";
import mongoose from "mongoose";
import config from "./app/config";
import app from "./app";

let server: Server;

async function main() {
    try {
      await mongoose.connect(config.database_url as string);
  
      app.listen(config.port, () => {
        console.log(`app listening on port ${config.port}`);
      });
    } catch (error) {
      console.log(error);
    }
  }
  main();

  
process.on("unhandledRejection", (err) => {
    console.log(`unhandledRejection is detected shutting down the server`);
    console.log("err", err);
    if (server) {
      server.close(() => {
        process.exit(1);
      });
    }
    process.exit(1);
  });
  
  process.on("uncaughtException", () => {
    console.log(`uncaughtException is detected shutting down the server`);
    process.exit(1);
  });
  