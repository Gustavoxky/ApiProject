import express from "express";
import path from "path";
import router from "./routes";

class TestServer {
  private server: any;

  constructor() {
    const app = express();

    app.use(express.json());
    app.use(router);

    app.use("/images", express.static(path.join(__dirname, "..", "uploads")));

    this.server = app.listen(4005, () => {
      console.log('Test server is running on port 4005');
    });
  }

  close() {
    this.server.close();
  }
}

export const testServer = new TestServer();
